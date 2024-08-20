import connectToDatabase from "../../../middleware/mongodb";
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
        const transactionsArray = await Transaction.find(query ? query : {}).populate('category');

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
        return;
      } catch (error) {
        return res.status(500).json({ message: "Something went wrong!" });
      }
    case 'DELETE':
      try {
        console.log(query)
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