const db = require('../models');

const Result = db.result;
const User = db.user;

exports.submitResult = async (request, response) => {
  const result = new Result({
    username: request.body.username,
    time: request.body.time,
    lvl: request.body.lvl,
    isVictory: request.body.isVictory,
  });
  if (request.body.isVictory) {
    await User.findOne({ username: request.body.username }).then(async (user) => {
      const key = `${request.body.lvl}Best`;
      if (!user[key] || user[key] > request.body.time) {
        const obj = {};
        obj[key] = request.body.time;
        await User.updateOne({ username: request.body.username }, { $set: obj });
      }
    });
  }

  result.save((error) => {
    if (error) {
      response.status(500).send({ message: error });
      return;
    }
    response.send({ message: 'Saved' });
  });
};

exports.topScores = async (request, response) => {
  const data = [];
  const sort = {};
  sort[`${request.query.lvl}Best`] = 1;
  await User.find({})
    .sort(sort)
    .limit(10)
    .then((results) => {
      results.forEach((result) => {
        const result = {
          username,
          firstName,
          lastName,
          easyScore,
          mediumScore,
          hardScore,
        }; 
        const obj = {
          username,
          firstName,
          lastName,
        };
        switch (`${request.query.lvl}`) {
          case 'EASY':
            obj.best = easyScore;
            break;
          case 'MEDIUM':
            obj.best = mediumScore;
            break;
          case 'HARD':
            obj.best = hardScore;
            break;
          default:
            obj.best = mediumBest;
            break;
        }
          data.push(obj);
      });
    });
  response.json(data);
};

exports.userData = async (request, response) => {
  const nGames = {};
  const numW = {};
  const bests = {
    easy: +Infinity,
    medium: +Infinity,
    hard: +Infinity,
  };
  const hardness = ['easy', 'medium', 'hard'];
  for (let i = 0; i < hardness.length; i++) {
    const lvl = hardness[i];
    // eslint-disable-next-line no-await-in-loop
    await Result.find({ username: request.query.name, lvl }).then((results) => {
      nGames[lvl] = results.length;
    });


    await Result.find({
      username: request.query.name,
      isVictory: true,
      lvl,
    }).then((results) => {
      numW[lvl] = results.length;
    });


    await Result.find({ username: request.query.name, isVictory: true, lvl })
      .sort({ time: 1 })
      .limit(1)
      .then((result) => {
        if (result.length > 0) {
          bests[lvl] = result[0].time;
        }
      });
  }

  response.json({ nGames, numW, bests });
};
