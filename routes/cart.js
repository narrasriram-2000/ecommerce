const express = require("express");
const { userAuth } = require("../middleware/user.js");
const Cart = require("../models/cartSchema.js");
const cartRouter = express.Router();

cartRouter.post("/addtocart", userAuth, async (req, res) => {
  try {
    const { productId, userId, quantity } = req.body;

    const cartItem = new Cart({
      productId,
      userId,
      quantity,
    });

    await cartItem.save();

    console.log(cartItem)

    res.status(201).json({ message: "Added to cart successfully", cartItem });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = cartRouter;
