const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  about: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  avatar: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Обязательное поле'],
  },
  password: {
    type: String,
    required: [true, 'Обязательное поле'],
    select: false,
  },
});

userSchema.statics.createUser = async function createUser(obj) {
  const user = await this.create(obj);
  const { password, ...rest } = user.toJSON();
  return rest;
};

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('user', userSchema);
