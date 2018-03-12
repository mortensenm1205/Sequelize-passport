const User = require('../models').User;

module.exports = (passport) => {

const LocalStrategy = require('passport-local').Strategy;

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    User.findOne({ where: {'email': email} }).then((user) => {

      if (user) {
        return done(null, false, req.flash('signupMessage', 'That email is already taken'));
      } else {
        return User.create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          user_name: req.body.user_name,
          email: email,
          password: password
        })
        .then((newUser) => {
          if(!newUser) {
            return done(null, false);
          }
          if(newUser) {
            return done(null, newUser);
          }
        });
      }
    });
  }))

}
