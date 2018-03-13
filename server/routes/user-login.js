module.exports = (app, passport) => {

  app.get('/login', (req, res) => {
    res.render('login', {message: req.flash('loginMessage')})
  });


  app.post('/login', passport.autehnticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }))

}
