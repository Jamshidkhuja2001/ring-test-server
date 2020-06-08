const express = require("express");
const {
  getAllproducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/prodController");

const router = express.Router();

router.route("/").get(getAllproducts).post(createProduct);
router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
