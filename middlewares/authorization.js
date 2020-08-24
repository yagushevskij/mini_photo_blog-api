const User = require('../models/user');
const CustomError = require('../classes/CustomError');

module.exports = async (req, res, next) => {
  try {
    const userExist = await User.exists({ _id: req.user._id });
    if (!userExist) {
      next(new CustomError('UnauthorizedError', 'Необходима авторизация'));
      return;
    }
    next();
  } catch (err) {
    next(err);
  }
};
