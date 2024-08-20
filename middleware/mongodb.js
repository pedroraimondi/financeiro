import mongoose from 'mongoose';

async function connectToDatabase() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_DB_URL);
}

export default connectToDatabase;