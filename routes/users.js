const users = require('express').Router();
const escape = require('escape-html');
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, editProfile, updateAvatar,
} = require('../controllers/users');
const { urlValidator } = require('../helpers.js');

users.get('/', getUsers);
users.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);
users.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().trim().min(2)
      .custom(escape)
      .max(30),
    about: Joi.string().trim().custom(escape).required(),
  }),
}), editProfile);
users.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(urlValidator),
  }),
}), updateAvatar);

module.exports = { users };
