const mongoose = require("mongoose");

const wishSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {type: String, required: true, trim: true},
    image: {type: String},
    // to be changed to the return value that will be used by google map api
    location: {type: String, trim: true},
    cost: {type: Number},
    timeLine: {type: Date},
    status: {
      type: String,
      enum: ["New", "Planning", "In progress", "Achieved"],
      default: "New",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
  },
  {timestamps: true},
);

module.exports = mongoose.model("Wish", wishSchema);
