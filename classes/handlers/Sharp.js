const sharp = require('sharp');
// const fs = require("fs");
// const got = require("got");
// const sharpStream = sharp({
//   failOnError: false,
// });
module.exports = class Sharp {
  constructor(picsConf, pathToProject) {
    this.pathToProject = pathToProject;
    const { original, content, preview } = picsConf;
    this.originPic = original;
    this.contentPic = content;
    this.previewPic = preview;
  }
  create = async (originalFile, name) => {
    this._originalFile = originalFile;
    this._name = name;
    const promises = [
      await this._createOriginal(),
      await this._createPreview(),
      await this._createContent(),
    ];
    return Promise.all(promises)
      .then(res => res)
      .catch(err => err);
  };

  _createOriginal = () => {
    const { path, formatName } = this.originPic;
    const filePath = path + this._name;
    return sharp(this._originalFile)
      .clone()
      .toFile(this.pathToProject + filePath)
      .then(() => {
        const result = new Object();
        result.format = formatName;
        result.path = filePath;
        return result;
      });
  };

  _createPreview = () => {
    const { width, quality, path, formatName } = this.previewPic;
    const filePath = path + this._name + '.webp';
    return sharp(this._originalFile)
      .clone()
      .resize({
        width,
        withoutEnlargement: true,
      })
      .webp(quality)
      .toFile(this.pathToProject + filePath)
      .then(() => {
        const result = new Object();
        result.format = formatName;
        result.path = filePath;
        return result;
      });
  };

  _createContent = () => {
    const { width, quality, path, formatName } = this.contentPic;
    const filePath = path + this._name + '.webp';
    return sharp(this._originalFile)
      .clone()
      .resize({
        width,
        withoutEnlargement: true,
      })
      .webp(quality)
      .toFile(this.pathToProject + filePath)
      .then(() => {
        const result = new Object();
        result.format = formatName;
        result.path = filePath;
        return result;
      });
  };
};
