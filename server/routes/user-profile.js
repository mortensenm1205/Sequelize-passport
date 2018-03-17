module.exports = (app, passport, isLoggedIn) => {

  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', {user: req.user});
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  })


}
