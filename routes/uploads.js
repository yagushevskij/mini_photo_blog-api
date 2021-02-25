const router = require('express').Router();
const { multerImageUpload } = require('../middlewares/multer');

const { uploadPicture } = require('../controllers/uploads');
// const {
//   validateUserIdParams, validateUsername, validateUser, validateAvatar,
// } = require('../middlewares/validations');

router.post('/card', multerImageUpload, uploadPicture);

module.exports = router;
