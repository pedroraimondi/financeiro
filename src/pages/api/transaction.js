import connectToDatabase from "../../../middleware/mongodb";
import Account from "../../../models/account";
import Category from "../../../models/category";
import Transaction from "../../../models/transaction";

export default async function handler(req, res) {
  await connectToDatabase();

  let { body, method, query } = req;

  // const { TK } = getCookies({ req, res });
  // const { _id: token } = jwt.decode(TK, process.env.SECRET_KEY) || { token: undefined };

  switch (method) {
    case 'GET':
      try {
        const queryOptions = {};
        if (query.account) { queryOptions.account = query.account }
        if (query.filter) {
          query.filter = JSON.parse(query.filter);

          const account = await Account.findById(query.account);
          account.filter = { period: query.filter.period };
          await account.save();

          if (query.filter?.recipients) {
            queryOptions['recipients.name'] = new RegExp(".*" + query.filter.recipients + ".*", "i");
          }

          const currentDate = query.filter.date ? new Date(query.filter.date) : new Date();

          switch (query.filter.period) {
            case 'monthly':
              const startOfMonth = currentDate;
              startOfMonth.setHours(0, 0, 0, 0);
              startOfMonth.setDate(1);

              const endOfMonth = new Date(startOfMonth);
              endOfMonth.setMonth(endOfMonth.getMonth() + 1);

              queryOptions.createdAt = {
                $gte: startOfMonth,
                $lt: endOfMonth
              };
              break;
            case 'weakly':
              const startOfWeek = currentDate;
              startOfWeek.setHours(0, 0, 0, 0);
              startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

              const endOfWeek = new Date(startOfWeek);
              endOfWeek.setDate(endOfWeek.getDate() + 7);

              queryOptions.createdAt = {
                $gte: startOfWeek,
                $lt: endOfWeek
              };
              break;
            case 'yearly':
              const startOfYear = currentDate;
              startOfYear.setMonth(0, 1); // Janeiro 1
              startOfYear.setHours(0, 0, 0, 0);

              const endOfYear = new Date(startOfYear);
              endOfYear.setFullYear(endOfYear.getFullYear() + 1);

              queryOptions.createdAt = {
                $gte: startOfYear,
                $lt: endOfYear
              };
              break;
            default:
              break;
          }
        }

        console.log(queryOptions)

        const transactionsArray = await Transaction.find(queryOptions).populate('category');

        const income = transactionsArray.filter((t) => t.type == "income").reduce((total, transaction) => total + transaction.value, 0);
        const outcome = transactionsArray.filter((t) => t.type == "outcome").reduce((total, transaction) => total + transaction.value, 0);

        const transaction = {
          transactions: transactionsArray,
          income,
          outcome,
          total: income - outcome
        }

        return res.status(200).json(transaction);
      } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong!" });
      }
    case 'POST':
      try {
        let category = await Category.findOne({ label: body.category })
        if (!category) {
          console.log('Category not found')
          const newCategory = new Category({ label: body.category });
          await newCategory.save();
          body.category = newCategory._id;
        } else {
          body.category = category._id;
        }
        const transaction = new Transaction({ ...body });
        await transaction.save();
        return res.status(200).json({ message: "Success" });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!" });
      }
    case 'PUT':
      try {
        let updatedTransaction;
        if (body?._id) { updatedTransaction = await Transaction.findById(body._id) }
        if (!updatedTransaction) return res.status(404).json({ message: "Something went wrong!" });
        let category = await Category.findOne({ label: body.category })
        if (!category) {
          console.log('Category not found')
          const newCategory = new Category({ label: body.category });
          await newCategory.save();
          body.category = newCategory._id;
        } else {
          body.category = category._id
        }
        let hasChange = Object.keys(body).some(arg => updatedTransaction[arg] && (updatedTransaction[arg] !== arg[body]));
        if (hasChange) { for (let arg in body) { updatedTransaction[arg] = body[arg]; } };
        updatedTransaction.createdAt = new Date(body.createdAt);
        await updatedTransaction.save();
        return res.status(200).json({ message: "Success" })
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!" });
      }
    case 'DELETE':
      try {
        await Transaction.findByIdAndDelete(query);
        return res.status(200).json({ message: "Success" });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!" });
      }
    default:
      return res.status(405).json({ errorMessage: `Method ${method} Not Allowed` })
  }

}