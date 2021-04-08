const router = require('express').Router();
const multer = require('multer');

const upload = multer();

const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const {
  getUsers, getUserById, getUserByUsername, editProfile, updateAvatar,
} = require('../controllers/users');
const {
  validateUserIdParams, validateUsername, validateUser, validateAvatar, validateCookies,
} = require('../middlewares/validations');

router.get('/', getUsers);
router.get('/id/:userId', validateUserIdParams, getUserById);
router.get('/username/:username', validateUsername, getUserByUsername);

// Роуты, защищенные авторизацией;
router.use(validateCookies, authentication);
router.use(authorization);
router.get('/me', getUserById);
router.patch('/me', upload.none(), validateUser, editProfile);
router.patch('/me/avatar', upload.none(), validateAvatar, updateAvatar);

module.exports = router;
