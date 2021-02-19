const router = require('express').Router();

const { uploadPicture, getFile } = require('../controllers/uploads');
// const {
//   validateUserIdParams, validateUsername, validateUser, validateAvatar,
// } = require('../middlewares/validations');
const { upload } = require('../middlewares/multer');

router.post('/',
  upload.single('picture'), uploadPicture);// Указываем multer в каком поле брать файл;
router.get('files/:path([\\w\\W]+)', getFile);

module.exports = router;
