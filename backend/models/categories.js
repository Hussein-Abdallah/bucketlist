/* eslint-disable @babel/no-invalid-this */
const mongoose = require('mongoose');

const Wish = require('./wishes');

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {type: String, required: false, trim: true},
    image: {type: String, required: false, trim: true},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {timestamps: true},
);

categorySchema.virtual('wishes', {
  ref: 'Wish',
  localField: '_id',
  foreignField: 'category',
});

categorySchema.pre('findOneAndDelete', async function (next) {
  try {
    const categoryId = this.getFilter()._id;
    await Wish.deleteMany({category: categoryId});
  } catch (error) {
    throw new Error(`Error deleting the list items: ${error}`);
  }
  next();
});

module.exports = mongoose.model('Category', categorySchema);
