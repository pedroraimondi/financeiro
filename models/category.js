import mongoose, { Schema } from 'mongoose';

var category = new Schema({
  label: { type: String, required: true, unique: true },
}, { timestamps: true });

mongoose.models = {};

var Category = mongoose.model('Category', category);

export default Category;