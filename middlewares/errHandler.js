const { errMessages } = require('../config');

module.exports = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const { message } = err;
  res.status(status).json({ message: message || errMessages.serverError });
  console.log(err); // Убрать в продакшне;
  next();
};
