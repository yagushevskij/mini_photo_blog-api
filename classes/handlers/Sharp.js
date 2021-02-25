const sharp = require('sharp');
const fs = require("fs");
const got = require("got");
const { Readable } = require('stream');
module.exports = class Sharp {
  constructor(picsConf, pathToProject) {
    this.pathToProject = pathToProject;
    const { original, content, preview } = picsConf;
    this.originPic = original;
    this.contentPic = content;
    this.previewPic = preview;

    this._promises = [];
    this._sharpStream = sharp({ failOnError: false, });
  }

  _init = () => {
    this._setOriginalConf();
    this._setContentConf();
    this._setPreviewConf();
  }

  createFromLink = (url, name) => {
    this._name = name;
    this._init();
    got.stream(url).pipe(this._sharpStream);
    return this._returnPromise();
  };

  createFromBuffer = (binary, name) => {
    this._name = name;
    this._init();
    this._bufferToStream(binary).pipe(this._sharpStream);
    return this._returnPromise();
  }

  _bufferToStream = (binary) => {
    const readableInstanceStream = new Readable({
      read() {
        this.push(binary);
        this.push(null);
      }
    });
    return readableInstanceStream;
  }

  _setOriginalConf = () => {
    const result = new Object();
    const { path, formatName } = this.originPic;
    this._originalPicPath = path + this._name;
    result[formatName] = this._originalPicPath
    this._promises.push(
      this._sharpStream
        .clone()
        .toFile(this.pathToProject + this._originalPicPath)
        .then(() => result)
    );
  };

  _setContentConf = () => {
    const result = new Object();
    const { width, quality, path, formatName } = this.contentPic;
    this._contentPicPath = path + this._name + '.webp';
    result[formatName] = this._contentPicPath
    this._promises.push(
      this._sharpStream
        .clone()
        .resize(width)
        .webp(quality)
        .toFile(this.pathToProject + this._contentPicPath)
        .then(() => result)
    );
  };

  _setPreviewConf = () => {
    const result = new Object();
    const { width, quality, path, formatName } = this.previewPic;
    this._previewPicPath = path + this._name + '.webp';
    result[formatName] = this._previewPicPath
    this._promises.push(
      this._sharpStream
        .clone()
        .resize(width)
        .webp(quality)
        .toFile(this.pathToProject + this._previewPicPath)
        .then(() => result)
    );
  };

  _returnPromise = () => {
    return Promise.all(this._promises)
      .then((res) => {
        return res.reduce((combo, el) => {
          for (const i in el) {
            combo[i] = el[i];
          }
          return combo;
        });
      })
      .catch(err => {
        try {
          fs.unlinkSync(this._originalPicPath);
          fs.unlinkSync(this._contentPicPath);
          fs.unlinkSync(this._previewPicPath);
        } catch (e) { }
        throw new Error(err);
      });
  };
};
