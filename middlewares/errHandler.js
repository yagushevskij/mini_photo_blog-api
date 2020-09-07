module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if ((err.name === 'MongoError') && (err.code === 11000)) {
    res.status(409).json({ message: err.message });
    return;
  }
  res.status(statusCode).json({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
};
