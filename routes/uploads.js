const router = require('express').Router();
const { upload } = require('../middlewares/multer');

const { uploadPicture } = require('../controllers/uploads');
// const {
//   validateUserIdParams, validateUsername, validateUser, validateAvatar,
// } = require('../middlewares/validations');

router.post('/',
  upload.single('picture'), // Указываем multer в каком поле брать файл;
  uploadPicture);

module.exports = router;
