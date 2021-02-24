const mongoose = require('mongoose');
const { errMessages } = require('../config');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, errMessages.fieldRequired],
  },
  link: {
    type: String,
    required: [false, errMessages.fieldRequired],
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
    original: String,
    content: String,
    preview: String,
  },
});

module.exports = mongoose.model('card', cardSchema);
