const router = require('express').Router();
const multer = require('multer');

const upload = multer();

const userRouter = require('./users');
const cardRouter = require('./cards');
const uploadRouter = require('./uploads');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const { login, createUser } = require('../controllers/users');
const {
  validateSignInBody, validateSignUpBody, validateCookies,
} = require('../middlewares/validations');

router.post('/signin', upload.none(), validateSignInBody, login);
router.post('/signup', upload.none(), validateSignUpBody, createUser);
router.use(validateCookies, authentication);
router.use(authorization);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/upload', uploadRouter);

module.exports = router;
