const User = require('../models').User;

module.exports = {
  createUser(req, res) {
    return User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password
    })
    .then(user => res.send(user))
    .catch(error => res.send(error));
  },
}
