const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../classes/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      next(new UnauthorizedError('Необходима авторизация'));
    } else {
      const token = authorization.replace('Bearer ', '');
      const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
      req.user = payload;
      console.log(req.user)
      next();
    }
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
};
