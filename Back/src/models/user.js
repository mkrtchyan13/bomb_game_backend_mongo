const mongoose = require('mongoose');

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true },
    email: { 
        type: String, 
        required: true, 
        unique: true },
    password: { 
        type: String, 
        required: true },
    firstName: { 
        type: String, 
        required: true },
    lastName: { 
        type: String, 
        required: true },
    easyScore: { 
        type: Number},
    mediuimScore: { 
        type: Number},
    hardScore: { 
        type: Number},
  })
);

module.exports = User;
