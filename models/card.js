const mongoose = require('mongoose');
const { errMessages } = require('../config');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, errMessages.fieldRequired],
  },
  source: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, errMessages.fieldRequired],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  files: {
    original: {
      link: String,
      dimension: {
        width: String,
        height: String,
      },
      filePath: String,
    },
    content: {
      link: String,
      dimension: {
        width: String,
        height: String,
      },
      filePath: String,
    },
    preview: {
      link: String,
      dimension: {
        width: String,
        height: String,
      },
      filePath: String,
    },
  },
});

module.exports = mongoose.model('card', cardSchema);
