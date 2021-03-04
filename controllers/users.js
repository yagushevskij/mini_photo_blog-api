const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../classes/NotFoundError');
const UnauthorizedError = require('../classes/UnauthorizedError');
const { errMessages, JWT_SECRET } = require('../config');

const getUsers = async (req, res, next) => {
  try {
    res.json(await User.find({}));
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const result = await User.findById(req.user._id)
      .orFail(new NotFoundError(errMessages.userNotFound));
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getUserByUsername = async (req, res, next) => {
  try {
    const result = await User.findOne({ username: req.params.username })
      .orFail(new NotFoundError(errMessages.userNotFound));
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      avatar, email, name, username, about, pageUrl
    } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);
    const result = await User.createUser({
      name, username, about, avatar, email, password, pageUrl,
    });
    const token = jwt.sign({ _id: result._id }, JWT_SECRET, { expiresIn: '7d' });
    res.send({ token, user: result });
  } catch (err) {
    if ((err.name === 'MongoError') && (err.code === 11000)) {
      err.statusCode = 409;
    }
    next(err);
  }
};

const editProfile = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const result = await User.findByIdAndUpdate(req.user, {
      $set: {
        name, about,
      },
    }, {
      new: true,
    }).orFail(new NotFoundError(errMessages.userNotFound));
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
    }).orFail(new NotFoundError(errMessages.userNotFound));
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password').orFail(new UnauthorizedError(errMessages.wrongAuthData));
    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (isPassCorrect) {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token, user });
    } else {
      next(new UnauthorizedError(errMessages.wrongAuthData));
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers, getUserById, getUserByUsername, createUser, editProfile, updateAvatar, login,
};
