const User = require('../models/user');
const UnauthorizedError = require('../classes/UnauthorizedError');

module.exports = async (req, res, next) => {
  try {
    const userExist = await User.exists({ _id: req.user._id });
    if (!userExist) {
      next(new UnauthorizedError('Необходима авторизация'));
      return;
    }
    next();
  } catch (err) {
    next(err);
  }
};
