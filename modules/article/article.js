const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    read_time: {
      type: Number,
      required: true,
      default: 5,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
