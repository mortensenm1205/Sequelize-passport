
module.exports = (app, passport) => {
  app.get('/signUp', (req, res, next) => {
    res.render('signup');
    next();
  });

  app.post('/signUp', passport.authenticate('local-signup',  {
    successRedirect: '/profile',
    failureRedirect: '/signUp',
    failureFlash: true
  }));

  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
  });





function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/signUp')
  }
}

};
