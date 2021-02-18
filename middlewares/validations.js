const { celebrate, Joi } = require('celebrate');
const escape = require('escape-html');
const { urlValidator, jwtValidator } = require('../helpers');

const validateSignInBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
const validateSignUpBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().trim()
      .min(2)
      .max(30)
      .custom(escape),
    username: Joi.string().alphanum().min(3).max(10)
      .trim()
      .required(),
    about: Joi.string().trim().custom(escape),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    avatar: Joi.string().custom(urlValidator),
  }),
});
const validateJWT = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().custom(jwtValidator),
  }).unknown(true),
});
const validateUserIdParams = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).hex(),
  }),
});
const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().trim().min(2)
      .custom(escape)
      .max(30),
    link: Joi.string().required().custom(urlValidator),
  }),
});
const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
});
const validateUsername = celebrate({
  params: Joi.object().keys({
    username: Joi.string().alphanum(),
  }),
});
const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().trim().min(2)
      .custom(escape)
      .max(30),
    about: Joi.string().trim().custom(escape).required(),
  }),
});
const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(urlValidator),
  }),
});

module.exports = {
  validateSignInBody,
  validateSignUpBody,
  validateJWT,
  validateUserIdParams,
  validateCard,
  validateCardId,
  validateUsername,
  validateUser,
  validateAvatar,
};
