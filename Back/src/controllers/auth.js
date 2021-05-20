const webtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secrets = require('../secrets/auth.secrets');
const db = require('../models');

const User = db.user;

exports.signup = (request, response) => {
  const user = new User({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    username: request.body.username,
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password, 8),
  });

  user.save((error) => {
    if (error) {
      response.status(500).send({ message: error });
      return;
    }
    response.send({ message: 'Successfully Registered' });
  });
};

exports.signin = (request, response) => {
  User.findOne({username: request.body.udername } || {email: request.body.email}).exec((error, user) => {
    if (error) {
      response.status(500).send({ message: error });
      return;
    }

    if (!user) {
      return response.status(404).send({ 
        message: 'There is no such user' 
      });
    }

    const passwordTrue = bcrypt.compareSync(
      request.body.password,
      user.password
    );

    if (!passwordTrue) {
      return response.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      });
    }
// 6 hours
    const token = webtoken.sign({ id: user.id }, secrets.secret, {
      expiresIn: 21600, 
    });

    response.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  });
};
