import connectToDatabase from "../../../middleware/mongodb";
import Account from "../../../models/account";

export default async function handler(req, res) {
  await connectToDatabase();

  const { body, method } = req;

  // const { TK } = getCookies({ req, res });
  // const { _id: token } = jwt.decode(TK, process.env.SECRET_KEY) || { token: undefined };
  switch (method) {
    case 'GET':
      try {
        const accounts = await Account.find({});

        res.status(200).json(accounts);
      } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
      } 
    case 'POST':
      try {
        const account = new Account({ ...body });
        await account.save();
        return res.status(200).json({ message: "Success" });
      } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
      } 
    case 'PUT':
      try {

      } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
      } 
    default:
      return res.status(405).json({ errorMessage: `Method ${method} Not Allowed` })
  }

}