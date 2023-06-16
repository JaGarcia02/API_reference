const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5400;

// product model
const Product = require("./models/productModels");

// json converter
app.use(express.json());
// json converter

// database
mongoose
  .connect(
    "mongodb+srv://tgarcia:qBKKvDeetBjnB9Wk@testcrud.zapjtej.mongodb.net/test"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
// database

// routes

// create
app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// view all
app.get("/product", async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// view one (by id)
app.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//update product
app.put("/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndUpdate(id, req.body);
    const product = await Product.findById(id);
    // not existing
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find product with the ID ${id}` });
    } else {
      return res.status(200).json(product);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// delete product
app.delete("/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find product with the ID ${id}` });
    } else {
      return res.status(200).json({ message: "product deleted!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
// routes

// routes
app.get("/", (req, res) => {
  res.send("Hello Node API");
});
app.get("/blog", (req, res) => {
  res.send("Hello Blog");
});
// routes
