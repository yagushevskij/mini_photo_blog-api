const validator = require('validator');
const { isCelebrate } = require('celebrate');
const ValidationError = require('./classes/ValidationError');
const UnauthorizedError = require('./classes/UnauthorizedError');

const urlValidator = (link) => {
  if (validator.isURL(link)) {
    return link;
  }
  throw new ValidationError('Ошибка валидации URL');
};

const cookieValidator = (cookie) => {
  if (!cookie || !cookie.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  return cookie;
};

const celebrateErrorHandler = (err, req, res, next) => {
  if (isCelebrate(err)) {
    next(err.joi);
  }
  next(err);
};

module.exports = { urlValidator, cookieValidator, celebrateErrorHandler };
