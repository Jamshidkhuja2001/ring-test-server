const Product = require("./../models/productModel");
const axios = require("axios");
const express = require("express");
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "../views"));
app.set("view-engine", "pug");

// getting all products
exports.getAllproducts = async (req, res) => {
  try {
    // const query = await axios.get("mongodb://127.0.0.1:27018");
    // console.log(query);
    const products = await Product.find();
    res.status(200).json({
      products,
    });
    // res.render("index", { products: query.data });
  } catch (err) {
    err;
  }
};

// creating products
exports.createProduct = async (req, res) => {
  try {
    let { name, price } = req.body;
    const product = await new Product({
      name,
      price,
    });
    product.save();
    res.status(201).json({
      product,
    });
  } catch (err) {
    res.json({
      err,
    });
  }
};

// getting product by id

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      product,
    });
  } catch (err) {
    return err;
  }
};

// updating product

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      product,
    });
  } catch (err) {
    return err;
  }
};

// deleting product

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.send("Product had been deleted");
  } catch (err) {
    return err;
  }
};
