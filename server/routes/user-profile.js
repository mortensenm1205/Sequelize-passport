module.exports = (app, passport) => {

  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', {user: req.user});
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/signUp');
  })

  //Found this gave me the best results, when testing to see if the user
  //is allowed to enter /profile i used this function within module.exports
  //and placed it in my get('/profile') route.
  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/signUp')
    }
  }
}
