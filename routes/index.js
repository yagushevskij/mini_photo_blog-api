const router = require('express').Router();
const multer = require('multer');

const upload = multer();

const userRouter = require('./users');
const cardRouter = require('./cards');
const uploadRouter = require('./uploads');
const { login, createUser, signout } = require('../controllers/users');
const {
  validateSignInBody, validateSignUpBody,
} = require('../middlewares/validations');

router.post('/signin', upload.none(), validateSignInBody, login);
router.post('/signup', upload.none(), validateSignUpBody, createUser);
router.get('/signout', signout);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/upload', uploadRouter);

module.exports = router;
