const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    unique: true,
    validate: [validator.isEmail, "Please provide valid email"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: 4,
  },
  passwordConfirm: {
    type: String,
    // required: true,
    validator: function (el) {
      return el === this.password;
    },
    message: "Passwords are not the same",
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.pre("save", function (next) {
  let user = this;

  if (user.isModified("password")) {
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

UserSchema.methods.generateToken = async function () {
  // Generate auth token for the user
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

UserSchema.statics.findByCridentials = async (email, password) => {
  // Search for user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error({ error: "Invalid login credentials" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error({ error: "Invalid login credentials" });
  }
  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
