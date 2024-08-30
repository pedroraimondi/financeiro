import mongoose, { Schema } from 'mongoose';

var transaction = new Schema({
  description: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  value: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  type: { type: String, enum: ['income', 'outcome'], required: true },
  destination: { type: String, enum: ['Prestador', 'Empresa'] },
  status: { type: String, enum: ['Pendente', 'Concluído'] },
  recipients: [{ quantity: Number, name: String }],
  account: { type: Schema.Types.ObjectId, ref: 'Account' },
  createdAt: { type: Date, default: Date.now }
});

mongoose.models = {};

var Transaction = mongoose.model('Transaction', transaction);

export default Transaction;