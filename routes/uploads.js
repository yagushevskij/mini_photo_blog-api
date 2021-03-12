const router = require('express').Router();
const { multerImageUpload } = require('../middlewares/multer');

const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const { validateCookies } = require('../middlewares/validations');

// Роуты, защищенные авторизацией;
router.use(validateCookies, authentication);
router.use(authorization);
const { uploadPicture } = require('../controllers/uploads');

router.post('/card', multerImageUpload, uploadPicture);

module.exports = router;
