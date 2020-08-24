module.exports = class CustomError extends Error {
  constructor(name, message, ...params) {
    super(message, params);
    this.name = name;
  }
};
