const sharp = require('sharp');
// const fs = require("fs");
// const got = require("got");
// const sharpStream = sharp({
//   failOnError: false,
// });
const { pathToProject, fileFormats } = require('../config');
const { changeFileName } = require('../helpers');

const createOriginal = async (file, originalName) => {
  const { path } = fileFormats.picture.original;
  return sharp(file)
    .clone()
    .toFile(pathToProject + path + originalName);
};

const createPreview = async (file, originalName) => {
  const { width, quality, path } = fileFormats.picture.preview;
  return sharp(file)
    .clone()
    .resize({
      width,
      withoutEnlargement: true,
    })
    .webp(quality)
    .toFile(pathToProject + path + originalName + '.webp');
};

const createContent = async (file, originalName) => {
  const { width, quality, path } = fileFormats.picture.content;
  return sharp(file)
    .clone()
    .resize({
      width,
      withoutEnlargement: true,
    })
    .webp(quality)
    .toFile(pathToProject + path + originalName + '.webp');
};

const test = async (req, res, next) => {
  const { originalname, buffer } = req.file;
  const promises = [
    createOriginal(buffer, originalname),
    createPreview(buffer, originalname),
    createContent(buffer, originalname),
  ];
  await Promise.all(promises)
    .then(result => next())
    .catch(err => next(err));
  // next();
};

module.exports = {
  test,
};
