const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'A user must have a username'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'A user must have a email'],
    trim: true,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
