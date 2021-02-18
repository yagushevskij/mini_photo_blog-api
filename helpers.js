const validator = require('validator');
const ValidationError = require('./classes/ValidationError');
const UnauthorizedError = require('./classes/UnauthorizedError');
const { errMessages } = require('./config');

const urlValidator = (link) => {
  if (validator.isURL(link)) {
    return link;
  }
  throw new ValidationError(errMessages.urlInvalid);
};

const jwtValidator = (jwt) => {
  if (!jwt || !jwt.startsWith('Bearer ')) {
    throw new UnauthorizedError(errMessages.authorizationRequired);
  }
  return jwt;
};

module.exports = { urlValidator, jwtValidator };
