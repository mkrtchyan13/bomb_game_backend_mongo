const mongoose = require('mongoose');

const Result = mongoose.model(
  'Result',
  new mongoose.Schema(
    {
      username: { 
          type: String, 
          required: true },
      time: { 
          type: Number, 
          required: true },
      lvl: { 
          type: String, 
        required: true },
      isVictory: { 
          type: Boolean, 
          required: true },
    },
  )
);

module.exports = Result;
