const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
AWS.config.loadFromPath('./server/config/s3_config.json');
const s3 = new AWS.S3();

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
  });

module.exports = (app, passport, isLoggedIn) => {

  app.get('/upload_img', isLoggedIn,  (req, res, next) => {
    res.render('upload-image');
    next();
  });

  app.post('/upload_img', upload.single('img-upload'), (req, res) => {
    res.send('img uploaded!');
  });
}
