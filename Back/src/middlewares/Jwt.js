const webtoken = require('jsonwebtoken');
const secrets = { secret: 'IIXCLtvNHQkCmnkc12qq',};
require('../models');

const verifyToken = (request, response, next) => {
  const token = request.headers['x-access-token'];
  if (!token) {
    return response.status(403).send({ message: 'The token wasnt provided' });
  }

  webtoken.verify(token, secrets.secret, (error, decoded) => {
    if (error) {
      return response.status(401).send({ message: 'Not authorized' });
    }
    request.userId = decoded.id;
    next();
  });
};

const jwtAuth = {
  verifyToken,
};
module.exports = jwtAuth;
