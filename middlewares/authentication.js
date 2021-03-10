const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../classes/UnauthorizedError');
const { errMessages, JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.cookie.replace('jwt=', '');
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    next(new UnauthorizedError(errMessages.authorizationRequired));
  }
};
