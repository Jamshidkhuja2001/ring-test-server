const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'A user must have a username'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    trim: true,
    unique: true,
    validate: [validator.isEmail, 'Please provide valid email'],
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: 4,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validator: function (el) {
      return el === this.password;
    },
    message: 'Passwords are not the same',
  },
});

UserSchema.pre('save', function (next) {
  let user = this;

  if (user.isModified('password')) {
    // hashing the password
    bcrypt.hash(user.password, 12).then((hash) => {
      user.password = hash;
      next();
    });

    // deleting passwordConfirm field from database
    this.passwordConfirm = undefined;
  } else {
    next();
  }
});

// comparing passwords
UserSchema.methods.comparePassword = function (
  candidatePassword,
  checkPassword
) {
  // try {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) throw checkPassword(err);
    checkPassword(null, isMatch);
  });

  // checkPassword(null, isMatch);
  // }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
