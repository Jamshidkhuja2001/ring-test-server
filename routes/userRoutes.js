const express = require("express");
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  login,
} = require("./../controllers/userController");
const router = express.Router();

router.route("/").get(getUsers);
router.route("/signup").post(createUser);
router.route("login").post(login);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
