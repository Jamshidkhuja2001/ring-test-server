const User = require("./../models/userModel");

// getting all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      users,
    });
  } catch (err) {
    console.log(err.message);
  }
};

// signing up user
exports.createUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = await new User({
      username,
      email,
      password,
    });
    newUser.save();

    res.status(201).json({
      newUser,
    });
  } catch (err) {
    res.json({
      err,
    });
    console.log(err.message);
  }
};

// logging in user
exports.login = async (req, res) => {};

// getting user by id
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err.message);
  }
};

// updating user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err.message);
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  try {
    await User.findById(req.params.id);
    res.send("User has been deleted");
  } catch (err) {
    console.log(err.message);
  }
};
