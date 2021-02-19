const fs = require('fs');
const getFileType = require('file-type');

const ForbiddenError = require('../classes/ForbiddenError');
const { errMessages } = require('../config');

const uploadPicture = (req, res) => {
  res.json({ status: 'Saved' });
};

const getFile = (req, res) => fs.readFile(path, (err, buffer) => {
  getFileType.fromBuffer(buffer)
    .then((type) => {
      const { mime } = type;
      res.setHeader('Content-Type', mime);
      res.send(console.log(type));
    });
});

module.exports = {
  uploadPicture, getFile,
};
