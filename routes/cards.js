const router = require('express').Router();
const multer = require('multer');

const upload = multer();

const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const {
  getCards, getCardsByUserId, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');
const {
  validateUserIdParams, validateCard, validateCardId, validateCookies,
} = require('../middlewares/validations');

router.get('/', getCards);
router.get('/user/:userId', validateUserIdParams, getCardsByUserId);

// Роуты, защищенные авторизацией;
router.use(validateCookies, authentication);
router.use(authorization);
router.post('/', upload.none(), validateCard, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/like/:cardId/', validateCardId, addLike);
router.delete('/like/:cardId/', validateCardId, removeLike);

module.exports = router;
