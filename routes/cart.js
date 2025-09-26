const express = require("express");
const { userAuth } = require("../middleware/user.js");
const Cart = require("../models/cartSchema.js");
const product = require('./product.js')
const cartRouter = express.Router();

cartRouter.post("/addtocart/:id", userAuth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const id = req.params.id;

    console.log(req.userId);

    const cartItem = new Cart({
      productId: id,
      userId: req.userId,
      quantity,
    });

    await cartItem.save();

    console.log(cartItem);

    res.status(201).json({ message: "Added to cart successfully", cartItem });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

cartRouter.delete("/clearCart/:productId", userAuth, async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedItem = await Cart.findOneAndDelete({
      userId: req.userId,
      productId,
    });

    console.log(deletedItem)

    if (!deletedItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    await Product.findOneAndUpdate(
      { productId : productId },
      { $inc: { quantity: 1 } }
    );

    res
      .status(200)
      .json({
        message: "Product removed from cart and quantity updated successfully",
      });
  } catch (error) {
    console.error(
      "Error removing product from cart or updating quantity:",
      error
    );
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = cartRouter;
