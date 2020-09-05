const validator = require('validator');
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

module.exports = { urlValidator, cookieValidator };
