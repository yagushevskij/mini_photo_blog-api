const cards = require('express').Router();
const { cardValidationRules } = require('../middlewares/validation.js');
const {
  getCards, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');

cards.get('/', getCards);
cards.post('/', [cardValidationRules.name, cardValidationRules.link], createCard);
cards.delete('/:cardId', deleteCard);
cards.put('/:cardId/likes', addLike);
cards.delete('/:cardId/likes', removeLike);

module.exports = { cards };
