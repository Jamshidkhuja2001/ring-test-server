const User = require('./../models/userModel');

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    users,
  });
};

exports.createUser = async (req, res) => {
  try {
    let { username, email } = req.body;
    const newUser = await new User({
      username,
      email,
    });
    newUser.save();

    res.status(201).json({
      newUser,
    });
  } catch (err) {
    res.json({
      err,
    });
    console.log(err);
  }
};
