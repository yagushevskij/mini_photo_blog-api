const { body } = require('express-validator');

const userValidationRules = {
  password: body('password').isLength({ min: 8 }).custom((value) => !/^\s+$/.test(value)).withMessage('Пароль должен быть от 8 символов'),
  name: body('name').trim().isLength({ min: 2 }, { max: 30 }).escape()
    .withMessage('Имя пользователя должно быть от 2 до 30 символов'),
  about: body('about').trim().notEmpty().escape()
    .withMessage('About - обязательное поле'),
  email: body('email').isEmail().withMessage('Некорректный Email'),
  avatar: body('avatar').isURL().withMessage('Некорректная ссылка'),
};

const cardValidationRules = {
  name: body('name').trim().isLength({ min: 2 }, { max: 30 }).escape()
    .withMessage('Название должно быть от 2 до 30 символов'),
  link: body('link').isURL().withMessage('Некорректная ссылка'),
};

module.exports = { userValidationRules, cardValidationRules };
