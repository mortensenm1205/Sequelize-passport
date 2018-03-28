const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const fs = require('fs');

AWS.config.loadFromPath('./server/config/s3_config.json');
AWS.config.logger = console.log;

const s3 = new AWS.S3();

module.exports = {
  createBucket(req) {
    var item = req.user;
    var params = { Bucket: item.bucketName };
    s3.createBucket(params, function (err, data) {
      if (err) {
        return console.log({ "error": err });
      }
      console.log({ data });
    });
  },
  uploadFile(req, res, next) {
    var item = req.user;
    var upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: 'full-stack-photo-app-jbm18',
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            key: function (req, file, cb) {
                cb(null, file.fieldname)
            }
        })
    })
    next();
  }
}
