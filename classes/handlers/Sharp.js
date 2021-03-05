const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const got = require('got');
const { Readable } = require('stream');
module.exports = class Sharp {
  constructor(picsConf, pathToProject, apiUrl) {
    this.pathToProject = pathToProject;
    const { original, content, preview } = picsConf;
    this._apiUrl = apiUrl;
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
    const { formatPath, formatName } = this.originPic;
    this._originalPicPath = formatPath + this._name;
    const pathToFile = path.join(this.pathToProject, this._originalPicPath)
    this._promises.push(
      this._sharpStream
        .clone()
        .toFile(pathToFile)
        .then((res) => {
          const result = {
            [formatName]: {
              link: this._apiUrl + this._originalPicPath,
              filePath: this._originalPicPath,
              dimension: {
                width: res.width,
                height: res.height,
              }
            }
          };
          return result
        })
    );
  };

  _setContentConf = () => {
    const { width, quality, formatPath, formatName } = this.contentPic;
    this._contentPicPath = formatPath + this._name + '.webp';
    const pathToFile = path.join(this.pathToProject, this._contentPicPath)
    this._promises.push(
      this._sharpStream
        .clone()
        .resize(width)
        .webp(quality)
        .toFile(pathToFile)
        .then((res) => {
          const result = {
            [formatName]: {
              link: this._apiUrl + this._contentPicPath,
              filePath: this._contentPicPath,
              dimension: {
                width: res.width,
                height: res.height,
              }
            }
          };
          return result
        })
    );
  };

  _setPreviewConf = () => {
    const { width, quality, formatPath, formatName } = this.previewPic;
    this._previewPicPath = formatPath + this._name + '.webp';
    const pathToFile = path.join(this.pathToProject, this._previewPicPath)
    this._promises.push(
      this._sharpStream
        .clone()
        .resize(width)
        .webp(quality)
        .toFile(pathToFile)
        .then((res) => {
          const result = {
            [formatName]: {
              link: this._apiUrl + this._previewPicPath,
              filePath: this._previewPicPath,
              dimension: {
                width: res.width,
                height: res.height,
              }
            }
          };
          return result
        })
    );
  };

  _returnPromise = () => {
    return Promise.all(this._promises)
      .then((res) => {
        let combo = {};
        res.forEach((el) => {
          for (let key of Object.keys(el)) {
            combo[key] = el[key];
          }
        });
        return combo;
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
