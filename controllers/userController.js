const User = require("./../models/userModel");

// getting all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      users,
    });
  } catch (err) {
    return err;
  }
};

// creating user
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

// getting user by id
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      user,
    });
  } catch (err) {
    return err;
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
    return err;
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  try {
    await User.findById(req.params.id);
    res.send("User has been deleted");
  } catch (err) {
    return err;
  }
};
