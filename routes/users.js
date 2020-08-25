const users = require('express').Router();
const { userValidationRules } = require('../middlewares/validation.js');
const {
  getUsers, getUserById, editProfile, updateAvatar,
} = require('../controllers/users');

users.get('/', getUsers);
users.get('/:userId', getUserById);
users.patch('/me', [userValidationRules.name, userValidationRules.about], editProfile);
users.patch('/me/avatar', [userValidationRules.avatar], updateAvatar);

module.exports = { users };
