import mongoose, { Schema } from 'mongoose';

var account = new Schema({
  variation: { type: String, required: true },
  color: { type: String, required: true },
  name: { type: String, required: true },
  filter: { type: Object  }
}, { timestamps: true });

mongoose.models = {};

var Account = mongoose.model('Account', account);

export default Account;