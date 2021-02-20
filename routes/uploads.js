const router = require('express').Router();
const { upload } = require('../middlewares/multer');
const { test } = require('../middlewares/sharp');

const { uploadPicture } = require('../controllers/uploads');
// const {
//   validateUserIdParams, validateUsername, validateUser, validateAvatar,
// } = require('../middlewares/validations');
router.post('/',
  upload.single('picture'), test, uploadPicture); // Указываем multer в каком поле брать файл;
// router.get('files/:path([\\w\\W]+)', getFile);

module.exports = router;
