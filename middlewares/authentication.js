const jwt = require('jsonwebtoken');
const CustomError = require('../classes/CustomError');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      next(new CustomError('UnauthorizedError', 'Необходима авторизация'));
    } else {
      const token = authorization.replace('Bearer ', '');
      const payload = jwt.verify(token, 'some-secret-key');
      req.user = payload;
      next();
    }
  } catch (err) {
    next(new CustomError('UnauthorizedError', 'Необходима авторизация'));
  }
};
