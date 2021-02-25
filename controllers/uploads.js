// const fs = require('fs');
// const getFileType = require('file-type');

const Card = require('../models/card');
const Sharp = require('../classes/handlers/Sharp');
const { changeFileName } = require('../helpers');
// const ForbiddenError = require('../classes/ForbiddenError');
const { fileFormats, pathToProject } = require('../config');

const sharpPicFromBuffer = (...args) => new Sharp(fileFormats.picture, pathToProject)
  .createFromBuffer(...args);

const uploadPicture = async (req, res, next) => {
  try {
    const fileName = changeFileName(res.req.file.originalname);
    await sharpPicFromBuffer(req.file.buffer, fileName)
      .then((resultArr) => {
        const formatsObj = resultArr.reduce((combo, el) => {
          for (const i in el) {
            combo[i] = el[i];
          }
          return combo;
        });
        Card.create({
          name: res.req.body.name, owner: res.req.user._id, files: formatsObj,
        })
          .then((result) => res.json(result));
      });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadPicture,
};
