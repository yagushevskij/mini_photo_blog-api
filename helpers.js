const validator = require('validator');
const ValidationError = require('./classes/ValidationError');

const urlValidator = (link) => {
  if (validator.isURL(link)) {
    return link;
  }
  throw new ValidationError('Ошибка валидации URL');
};

module.exports = { urlValidator };
