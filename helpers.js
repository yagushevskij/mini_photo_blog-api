const getErrMessages = (array) => {
  let errorMessage = '';
  array.forEach((item) => {
    errorMessage += `${item.msg}. `;
  });
  return errorMessage;
};

module.exports = { getErrMessages };
