
module.exports = (app, passport) => {
  app.get('/', (req, res, next) => {
    res.render('signup');
    next();
  })

  app.post('/signUp', passport.authenticate('local-signup'), (req, res) => {
      res.redirect('/profile');
  })

  app.get('/profile',  (req, res) => {
    res.render('profile');
  });
};
