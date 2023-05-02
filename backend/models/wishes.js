const mongoose = require('mongoose');

const wishSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {type: String, trim: true},
    image: {type: String},
    location: {type: String, trim: true},
    cost: {type: Number},
    timeline: {type: Date, default: Date.now},
    status: {
      type: String,
      enum: ['New', 'Planning', 'In progress', 'Achieved'],
      default: 'New',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
  },
  {timestamps: true},
);

module.exports = mongoose.model('Wish', wishSchema);
