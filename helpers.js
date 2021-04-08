const validator = require('validator');
const ValidationError = require('./classes/ValidationError');
const { errMessages } = require('./config');

const urlValidator = (link) => {
  if (validator.isURL(link)) {
    return link;
  }
  throw new ValidationError(errMessages.urlInvalid);
};

const changeFileName = (originalname = 'pic.jpg') => {
  const indexOfStartExt = originalname.lastIndexOf('.');
  const strLength = originalname.length;
  const extension = originalname.substr(indexOfStartExt);
  const extLength = extension.length;
  const filename = originalname.substr(0, strLength - extLength);
  const randomStr = Math.random().toString(36).substring(7);
  return filename + '_' + randomStr + extension;
};

module.exports = { urlValidator, changeFileName };
