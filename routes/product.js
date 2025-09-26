const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema.js");
const validation = require("./validation.js");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middleware/user.js");
const Product = require("../models/productSchema.js");

const productRouter = express.Router();

productRouter.post("/createProduct", userAuth, async (req, res) => {
  try {
    if (req.data.role === "seller") {
      const { productName, quantity } = req.body;
      const data = new Product({
        productName,
        quantity,
      });

      await data.save();
      console.log(data);
      res.send("create product");
    } else {
      res.send("access denied for customer");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

productRouter.delete("/deleteProduct/:_id", userAuth, async (req, res) => {
  try {
    if (req.data.role !== "seller") {
      return res
        .status(403)
        .json({ message: "Access denied. Only sellers can delete products." });
    }

    const { _id } = req.params;

    console.log("productID", _id);

    if (!_id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const deletedProduct = await Product.findOneAndDelete({ _id });

    console.log("deletedProduct", deletedProduct);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

productRouter.get("/viewProduct", userAuth, async (req, res) => {
  const data = await Product.find({});
  console.log(data);

  res.status(200).json({
    message: "products",
    product: data,
  });
});

module.exports = productRouter;
