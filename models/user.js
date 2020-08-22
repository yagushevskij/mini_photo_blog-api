const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Обязательное поле'],
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  avatar: {
    type: String,
    required: [true, 'Обязательное поле'],
    validate: (link) => validator.isURL(link),
  },
  email: {
    type: String,
    unique: [true, 'Пользователь с этим email уже существует'],
    required: [true, 'Обязательное поле'],
    validate: (email) => validator.isEmail(email),
  },
  password: {
    type: String,
    required: [true, 'Обязательное поле'],
    select: false,
  },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('user', userSchema);
