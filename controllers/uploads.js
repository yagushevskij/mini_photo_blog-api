// const fs = require('fs');
// const getFileType = require('file-type');

const Card = require('../models/card');
const Sharp = require('../classes/handlers/Sharp');
const { changeFileName } = require('../helpers');
// const ForbiddenError = require('../classes/ForbiddenError');
const { fileFormats, pathToProject, apiUrl } = require('../config');

const sharp = new Sharp(fileFormats.picture, pathToProject);
const createSharpedPic = (...args) => sharp.create(...args);

const uploadPicture = async (req, res, next) => {
  try {
    const fileName = changeFileName(res.req.file.originalname);
    await createSharpedPic(req.file.buffer, fileName)
      .then((formatsArr) => {
        const formatsObj = formatsArr.reduce((combo, item) => {
          combo[item.format] = apiUrl + item.path;
          return combo;
        }, {});
        Card.create({
          name: res.req.body.name, owner: res.req.user._id, files: formatsObj,
        })
          .then((result) => res.json(result));
      });
    // .catch((err) => next(err));
    // console.log(res.req.file.originalname, res.req.body.name, res.req.user._id,
    // res.req.file.formats);
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
