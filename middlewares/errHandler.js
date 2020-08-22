module.exports = (err, req, res, next) => {
  if (err.name === 'NotFound') {
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
  if (err.name === 'Forbidden') {
    res.status(403).json({ message: err.message });
    return;
  }
  if (err.name === 'Unauthorized') {
    res.status(401).json({ message: err.message });
    return;
  }
  res.status(500).json({ message: 'На сервере произошла ошибка' });
  next();
};
