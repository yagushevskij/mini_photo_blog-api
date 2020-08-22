const jwt = require('jsonwebtoken');
const { authRequiredErr } = require('../data.js');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(authRequiredErr);
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = jwt.verify(token, 'some-secret-key');
      req.user = payload;
      next();
    } catch (err) {
      next(authRequiredErr);
    }
  }
};
