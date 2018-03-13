
module.exports = (app, passport) => {
  app.get('/signUp', (req, res, next) => {
    res.render('signup', {message: req.flash('signupMessage')});
    next();
  });
  //The passport.autehnticate has the req, res already configured in there
  //thats why you don't see another cb function. You can set this up in a
  //couple different ways. Including a way to have control stil over req, and res
  app.post('/signUp', passport.authenticate('local-signup',  {
    //Something to note here is that the redirect isn't an actuall url change
    //but rather where a user can choose to go once they've been authenticated
    //it's not really a list of options to choose from but after the user is authenticated
    //they can successfully go to the redirect route.
    successRedirect: '/profile',
    failureRedirect: '/signUp',
    failureFlash: true
  }));

  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', {user: req.user});
  });




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

};
