const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const escape = require('escape-html');
const User = require('../models/user');
const { userNotFoundErr, wrongAuthErr, validationErr } = require('../data.js');
const { isPassValid } = require('../helpers.js');

const getUsers = async (req, res, next) => {
  try {
    res.json(await User.find({}));
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const result = await User.findById(req.params.userId).orFail(userNotFoundErr);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email,
    } = req.body;
    if (isPassValid(req.body.password)) {
      const password = await bcrypt.hash(req.body.password, 10);
      const result = await User.create({
        name, about, avatar, email, password,
      });
      res.json(result);
    } else {
      validationErr.message = 'Невалидный пароль';
      next(validationErr);
    }
  } catch (err) {
    next(err);
  }
};

const editProfile = async (req, res, next) => {
  try {
    const {
      name, about, email,
    } = req.body;
    const result = await User.findByIdAndUpdate(req.user, {
      $set: {
        name, about, email,
      },
    }, {
      new: true,
      runValidators: true,
      context: 'query',
    }).orFail(userNotFoundErr);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const result = await User.findByIdAndUpdate(req.user, { $set: { avatar: req.body.avatar } }, {
      new: true,
      runValidators: true,
    }).orFail(userNotFoundErr);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password').orFail(wrongAuthErr);
    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (isPassCorrect) {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 604800, httpOnly: true }).end();
    } else {
      next(wrongAuthErr);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers, getUserById, createUser, editProfile, updateAvatar, login,
};
