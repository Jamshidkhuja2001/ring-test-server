const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer", "");
  const data = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const user = await User.findOne({ _id: data._id, "tokens.token": token });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  }
};
