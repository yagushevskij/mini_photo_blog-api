const cards = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');

cards.get('/', getCards);
cards.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().trim().min(2)
      .max(30),
    link: Joi.string().required().uri(),
  }),
}), createCard);
cards.delete('/:cardId', deleteCard);
cards.put('/:cardId/likes', addLike);
cards.delete('/:cardId/likes', removeLike);

module.exports = { cards };
