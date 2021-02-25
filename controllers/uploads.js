// const fs = require('fs');
// const getFileType = require('file-type');

const Card = require('../models/card');
const Sharp = require('../classes/handlers/Sharp');
const { changeFileName } = require('../helpers');
// const ForbiddenError = require('../classes/ForbiddenError');
const { fileFormats, pathToProject, apiUrl } = require('../config');

const sharpPicFromBuffer = (...args) => new Sharp(fileFormats.picture, pathToProject, apiUrl)
  .createFromBuffer(...args);

const uploadPicture = async (req, res, next) => {
  try {
    const { originalname, buffer } = req.file;
    const fileName = changeFileName(originalname);
    const picsObj = await sharpPicFromBuffer(buffer, fileName);
    await Card.create({
      name: req.body.name, owner: req.user._id, files: picsObj,
    })
      .then((result) => res.json(result));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadPicture,
};
