module.exports = (app, passport, isLoggedIn) => {
  app.get('/upload_img', isLoggedIn, (req, res) => {
    res.render('upload-image');
  });
}
