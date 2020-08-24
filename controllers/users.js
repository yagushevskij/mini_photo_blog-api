const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const CustomError = require('../classes/CustomError');
const { jwtSecretKey } = require('../data.js');

const getUsers = async (req, res, next) => {
  try {
    res.json(await User.find({}));
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const result = await User.findById(req.params.userId).orFail(new CustomError('NotFoundError', 'Пользователь не найден'));
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    validationResult(req).throw(); // Валидация данных.
    // Если данные невалидны - срабатывает блок catch.
    const {
      avatar, email, name, about,
    } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);
    const result = await User.createUser({
      name, about, avatar, email, password,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const editProfile = async (req, res, next) => {
  try {
    validationResult(req).throw();
    const { name, about } = req.body;
    const result = await User.findByIdAndUpdate(req.user, {
      $set: {
        name, about,
      },
    }, {
      new: true,
      // runValidators: true,
    }).orFail(new CustomError('NotFoundError', 'Пользователь не найден'));
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    validationResult(req).throw();
    const result = await User.findByIdAndUpdate(req.user, { $set: { avatar: req.body.avatar } }, {
      new: true,
      runValidators: true,
    }).orFail(new CustomError('NotFoundError', 'Пользователь не найден'));
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password').orFail(new CustomError('UnauthorizedError', 'Неверный логин или пароль'));
    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (isPassCorrect) {
      const token = jwt.sign({ _id: user._id }, jwtSecretKey, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 60 * 60 * 24 * 7 * 1000, httpOnly: true, sameSite: true }).end();
    } else {
      next(new CustomError('UnauthorizedError', 'Неверный логин или пароль'));
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers, getUserById, createUser, editProfile, updateAvatar, login,
};
