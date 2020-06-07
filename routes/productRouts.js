const express = require('express');
const {
  getAllproducts,
  createProduct,
} = require('./../controllers/prodController');

const router = express.Router();

router.route('/').get(getAllproducts).post(createProduct);

module.exports = router;
