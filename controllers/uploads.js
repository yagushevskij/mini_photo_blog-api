const { test } = require('../middlewares/sharp');
// const fs = require('fs');
// const getFileType = require('file-type');

const ForbiddenError = require('../classes/ForbiddenError');
const { errMessages } = require('../config');

const uploadPicture = (req, res, next) => {
  try {
    console.log(res.req.file.originalname, res.req.body.name, res.req.user._id, res.req.file.formats);
    // test(res.req.file);
    res.json({ status: 'Saved' });
  } catch (err) {
    next(err);
  }
};

// const getFile = (req, res) => fs.readFile(path, (err, buffer) => {
//   getFileType.fromBuffer(buffer)
//     .then((type) => {
//       const { mime } = type;
//       res.setHeader('Content-Type', mime);
//       res.send(console.log(type));
//     });
// });

module.exports = {
  uploadPicture,
};
