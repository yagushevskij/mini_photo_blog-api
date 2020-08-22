const users = require('express').Router();
const {
  getUsers, getUserById, editProfile, updateAvatar,
} = require('../controllers/users');

users.get('/', getUsers);
users.get('/:userId', getUserById);
users.patch('/me', editProfile);
users.patch('/me/avatar', updateAvatar);

module.exports = { users };
