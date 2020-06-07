const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoute = require("./routes/productRouts");
const userRoute = require("./routes/userRoutes");
const path = require("path");

dotenv.config({ path: "./config.env" });

const app = express();
const DB = process.env.DB;

app.set("views", path.join(__dirname, "views"));
app.set("view-engine", "pug");

// DB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/products", productRoute);
app.use("/users", userRoute);

app.listen(3000, () => {
  console.log("app is running");
});
