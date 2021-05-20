const db = require('../models');

const User = db.user;

const checkFewUsernameEmail = (request, response, next) => {
  User.findOne({
    username: request.body.username,
  }).exec((error, user) => {
    if (error) {
      response.status(500).send({ message: error });
      return;
    }

    if (user) {
      response.status(400).send({ message: 'Username already exsists' });
      return;
    }

    User.findOne({
      email: request.body.email,
    }).exec((errEmail, userEmail) => {
      if (errEmail) {
        response.status(500).send({ message: errEmail });
        return;
      }

      if (userEmail) {
        response.status(400).send({ message: 'Email already exsists' });
        return;
      }

      next();
    });
  });
};

const verifySignUp = {
  checkFewUsernameEmail,
};

module.exports = verifySignUp;
