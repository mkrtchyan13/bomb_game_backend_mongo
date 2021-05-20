const { jwtAuth } = require('../middlewares');
const controller = require('../controllers/user');

module.exports = (app) => {
  app.use((request, response, next) => {
    response.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/Top10', controller.topScores);

  app.post('/api/SignIn', [jwtAuth.verifyToken], controller.submitResult);

  app.get('/api/Dashboard', controller.userData);
};
