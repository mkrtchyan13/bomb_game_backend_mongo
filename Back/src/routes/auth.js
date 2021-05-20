const { verifySignUp } = require('../middlewares');
const controller = require('../controllers/auth');

module.exports = (app) => {
  app.use((request, response, next) => {
    response.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post(
    '/api/SignUp',
    [verifySignUp.checkFewUsernameEmail],
    controller.signup
  );

  app.post('/api/SignIn', controller.signin);
};
