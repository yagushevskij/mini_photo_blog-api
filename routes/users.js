const router = require('express').Router();
const multer = require('multer');

const upload = multer();

const {
  getUsers, getUserById, getUserByUsername, editProfile, updateAvatar,
} = require('../controllers/users');
const {
  validateUserIdParams, validateUsername, validateUser, validateAvatar,
} = require('../middlewares/validations');

router.get('/', getUsers);
router.get('/me', getUserById);
router.get('/id/:userId', validateUserIdParams, getUserById);
router.get('/:username', validateUsername, getUserByUsername);
router.patch('/me', upload.none(), validateUser, editProfile);
router.patch('/me/avatar', upload.none(), validateAvatar, updateAvatar);

module.exports = router;
