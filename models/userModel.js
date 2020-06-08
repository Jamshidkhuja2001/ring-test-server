const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A user must have a username"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
