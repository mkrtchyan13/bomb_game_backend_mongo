const mongoose = require('mongoose');
const dbConfig = {
    HOST: 'localhost',
    PORT: 27017,
    DB: 'game',
  };
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user');
db.result = require('./result');


db.start =() => {
    db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connect to MongoDB.');
    })
    .catch((error) => {
      console.error('Connection error', error);
      process.exit();
    });
}

module.exports = db;