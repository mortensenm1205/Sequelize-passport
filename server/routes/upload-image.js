const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = new AWS.S3();

module.exports = (app, passport, isLoggedIn, s3) => {
  app.use('/upload_img', (req, res, next) => {
    var item = req.user;
    var upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: item.bucketName,
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            key: function (req, file, cb) {
                cb(null, file.fieldname)
            }
        })
    })
    next();
  });

  app.get('/upload_img', isLoggedIn,  (req, res, next) => {
    res.render('upload-image');
    next();
  });

  app.post('/upload_img', (req, res) => {

  });
}
