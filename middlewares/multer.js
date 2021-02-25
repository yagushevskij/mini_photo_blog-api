const multer = require('multer');

const imageFilter = (req, file, cb) => {
  const fileType = file.mimetype.split('/')[0];
  if (fileType !== 'image') {
    cb(null, false);
    return cb(new Error('Something went wrong'), false);
  }
  cb(null, true);
};
const storage = multer.memoryStorage();
const multerImageUpload = multer({ storage, fileFilter: imageFilter }).single('picture');
const upload = multer({ storage });

module.exports = {
  upload, multerImageUpload,
};
