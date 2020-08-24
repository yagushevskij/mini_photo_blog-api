module.exports = (err, req, res, next) => {
  // Проверяем, есть ли свойство errors, которое создает модуль валидации
  // и отправляем ошибку.
  if (err.errors) {
    res.status(400).send(err.errors);
    return;
  }
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
  res.status(500).json({ message: 'На сервере произошла ошибка' });
  next();
};
