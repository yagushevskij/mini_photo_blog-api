const cards = require('express').Router();
const escape = require('escape-html');
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');
const { urlValidator } = require('../helpers.js');

cards.get('/', getCards);
cards.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().trim().min(2)
      .custom(escape)
      .max(30),
    link: Joi.string().required().custom(urlValidator),
  }),
}), createCard);
cards.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
}), deleteCard);
cards.put('/like/:cardId/', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
}), addLike);
cards.delete('/like/:cardId/', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
}), removeLike);

module.exports = { cards };
