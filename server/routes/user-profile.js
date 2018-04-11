const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
AWS.config.loadFromPath('./server/config/s3_config.json');
const s3 = new AWS.S3();
var fileKey;

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'full-stack-photo-app-jbm18',
        filename: function (req, file, cb) {
            //
            cb(null, file.fieldname +  '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
        },
        key: function (req, file, cb) {
            cb(null, file.fieldname +  '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
            fileKey = file.fieldname +  '-' + Date.now() + '.' + file.mimetype.split('/')[1];

        }
    })
  });




module.exports = (app, passport, isLoggedIn) => {

  app.get('/profile', isLoggedIn, (req, res, next) => {
    s3.listObjects({ Bucket: 'full-stack-photo-app-jbm18'}, (err, data) => {
      if (err) (console.log(err));
      res.render('profile', { user: req.user, imgSrc: data.Contents});
    })
  });

  app.post('/profile', upload.single('img-upload'), (req, res) => {
    const img = {
      value: fileKey
    }
    res.render('profile', {  user: req.user, imgSrc: img.value});
    console.log(fileKey);
  })

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  })


}
