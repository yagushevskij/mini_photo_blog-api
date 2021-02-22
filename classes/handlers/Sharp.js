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
      this._createOriginal(),
      this._createPreview(),
      this._createContent(),
    ];
    await Promise.all(promises)
      .then(res => console.log('Pics created', res))
      .catch(err => Promise.reject(err));
  };

  _createOriginal = async () => {
    const { path } = this.originPic;
    return sharp(this._originalFile)
      .clone()
      .toFile(this.pathToProject + path + this._name);
  };
  
  _createPreview = async () => {
    const { width, quality, path } = this.previewPic;
    return sharp(this._originalFile)
      .clone()
      .resize({
        width,
        withoutEnlargement: true,
      })
      .webp(quality)
      .toFile(this.pathToProject + path + this._name + '.webp');
  };
  
  _createContent = async () => {
    const { width, quality, path } = this.contentPic;
    return sharp(this._originalFile)
      .clone()
      .resize({
        width,
        withoutEnlargement: true,
      })
      .webp(quality)
      .toFile(this.pathToProject + path + this._name + '.webp');
  };
};
