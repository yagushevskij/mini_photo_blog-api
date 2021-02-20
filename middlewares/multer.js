const multer = require('multer');
// const { changeFileName } = require('../helpers');
// const { pathToProject, pathToPictures } = require('../config');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, pathToProject + pathToPictures
//       .original); // директория, в которую будут сохранятся файлы
//   },
//   filename: (req, file, cb) => {
//     const { originalname } = file;
//     cb(null, changeFileName(originalname));
//   },
// });
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = {
  upload,
};
