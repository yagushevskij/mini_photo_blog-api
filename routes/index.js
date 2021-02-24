const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
const uploadRouter = require('./uploads');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const { login, createUser } = require('../controllers/users');
const {
  validateSignInBody, validateSignUpBody, validateJWT,
} = require('../middlewares/validations');

router.post('/signin', validateSignInBody, login);
router.post('/signup', validateSignUpBody, createUser);
router.use(validateJWT, authentication);
router.use(authorization);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/upload', uploadRouter);

module.exports = router;
