const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    trim: true,
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price'],
  },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
