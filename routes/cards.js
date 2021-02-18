const router = require('express').Router();

const {
  getCards, getCardsByUserId, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');
const { validateUserIdParams, validateCard, validateCardId } = require('../middlewares/validations');

router.get('/', getCards);
router.get('/user/:userId', validateUserIdParams, getCardsByUserId);
router.post('/', validateCard, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/like/:cardId/', validateCardId, addLike);
router.delete('/like/:cardId/', validateCardId, removeLike);

module.exports = router;
