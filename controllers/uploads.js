// const fs = require('fs');
// const getFileType = require('file-type');

const Sharp = require('../classes/handlers/Sharp');
const { changeFileName } = require('../helpers');
// const ForbiddenError = require('../classes/ForbiddenError');
const { fileFormats, pathToProject } = require('../config');

const sharp = new Sharp(fileFormats.picture, pathToProject)
const createSharpedPic = (...args) => sharp.create(...args);

const uploadPicture = async (req, res, next) => {
  try {
    const fileName =  changeFileName(res.req.file.originalname);
    await createSharpedPic(req.file.buffer, fileName)
    .then(() => {

    })
    .catch(err => next(err))
    // console.log(res.req.file.originalname, res.req.body.name, res.req.user._id, res.req.file.formats);
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
