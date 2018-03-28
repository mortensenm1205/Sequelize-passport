/*
Add your passport strategy in your config folder, along side your config.json
The only thing we have to bring from our other files is the model, in this case,
User since it's the only thing we have to test for authentication on.
*/

const User = require('../models').User;


module.exports = (passport) => {
//Had it before where this line was outside of the module.exports. But this seems
//to work better
const LocalStrategy = require('passport-local').Strategy;

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  //These serialize functions help keep our user.id stored as a session
  //so that we can easily authenticate. The thing to note is the user.get()
  //This is a global getter function within Sequelize which allows us to retrieve
  //the user object itself.
  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });


  //I got a lot of these code snippets from coding tutiorals but i had to
  //rewrite the db statements to match Sequelize's (most were written in MongoDB)
  //promise based queries.
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    User.findOne({ where: {'email': email} }).then((user) => {
      //really simple condition to see if a user exists or not in the db
      if (user) {
        //req.flash is part of the connect-flash module. Here I'm setting the signupMessage
        //value
        return done(null, false, req.flash('signupMessage', 'That email is already taken'));
      } else {
        //if user doesn't exist we use Sequelize db statements to create a record
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
  }));

  passport.use('local-login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      User.findOne({ where: {'email': email}}).then((user) => {
        if(!user) {
          return done(null, false, req.flash('loginMessage', 'Email does not exist'));
        }
        if(!user.password) {
          return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
        }
        var userInfo = user.get();
        return done(null, userInfo);
      }).catch((err) => {
        console.log("Error:", err);
        return done(null, false, req.flash('loginMessage', 'Something Went wrong with your Login'))
      });
    }))
}
