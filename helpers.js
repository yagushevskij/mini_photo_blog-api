const User = require('./models/user');

const isUserExist = (userId) => User.exists({ _id: userId });

const isPassValid = (pass) => {
  const minlength = 6;
  const maxlength = 16;
  return (pass.length > minlength && pass.length < maxlength);
};

module.exports = { isUserExist, isPassValid };
