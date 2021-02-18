const User = require('../models/user');
const UnauthorizedError = require('../classes/UnauthorizedError');
const { errMessages } = require('../config');

module.exports = async (req, res, next) => {
  try {
    const userExist = await User.exists({ _id: req.user._id });
    if (!userExist) {
      next(new UnauthorizedError(errMessages.authorizationRequired));
      return;
    }
    next();
  } catch (err) {
    next(err);
  }
};
