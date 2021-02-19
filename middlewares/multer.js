const multer = require('multer');
const { getRandomStr } = require('../helpers');
const { pathToProject } = require('../config');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pathToProject + '/files/pictures'); // директория, в которую будут сохранятся файлы
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, originalname + getRandomStr());
  },
});
const upload = multer({ storage });

module.exports = {
  upload,
};
