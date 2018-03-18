const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const fs = require('fs');

AWS.config.loadFromPath('./server/config/s3_config.json');
AWS.config.logger = console.log;

const s3 = new AWS.S3();

module.exports = {
  createBucket(req, res) {
    var item = req.user;
    var params = { Bucket: item.bucketName };
    s3.createBucket(params, function (err, data) {
      if (err) {
        return console.log({ "error": err });
      }
      console.log({ data });
    });
  }
}
