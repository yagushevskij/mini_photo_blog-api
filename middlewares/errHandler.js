const { getErrMessages } = require('../helpers.js');

module.exports = (err, req, res, next) => {
  if (err.name === 'NotFoundError') {
    res.status(404).json({ message: err.message });
    return;
  }
  if (err.name === 'CastError') {
    res.status(400).json({ message: err.message });
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(400).json({ message: err.message });
    return;
  }
  if (err.name === 'ForbiddenError') {
    res.status(403).json({ message: err.message });
    return;
  }
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: err.message });
    return;
  }
  // Проверяем, есть ли свойство errors, которое создает модуль валидации.
  // Извлекаем из массивов сообщения и отправляем.
  if (err.errors) {
    res.status(400).send({ message: getErrMessages(err.errors) });
    return;
  }
  res.status(500).json({ message: 'На сервере произошла ошибка' });
  next();
};
