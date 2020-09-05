const users = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, editProfile, updateAvatar,
} = require('../controllers/users');

users.get('/', getUsers);
users.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);
users.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().trim().min(2)
      .max(30),
    about: Joi.string().trim().required(),
  }),
}), editProfile);
users.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
}), updateAvatar);

module.exports = { users };
