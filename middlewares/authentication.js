const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../classes/UnauthorizedError');
const { errMessages, JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    console.log(err);
    next(new UnauthorizedError(errMessages.authorizationRequired));
  }
};
