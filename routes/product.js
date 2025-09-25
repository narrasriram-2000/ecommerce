const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema.js");
const validation = require("./validation.js");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middleware/user.js");
const Product = require("../models/productSchema.js")

const productRouter = express.Router();

productRouter.post("/createProduct", userAuth, async (req, res) => {
  console.log(req.data);
   
  try{
   
    if (req.data.role === "seller") {
    const { productName, productID } = req.body;
       const data = new Product({
      productName,
      productID
    });

    await data.save();
    console.log(data);
    res.send("create product");
  } else {
    res.send("access denied for customer");
  }
  }catch (error){
   res.status(404).send(error.message)
  }
});

// productRouter.post("/deleteProduct", (req,res)=>{


// })

productRouter.get("/viewProduct", userAuth, async(req,res)=>{

const data = await Product.find({})
console.log(data)

res.status(200).json({

    message: "products",
    product: data
})
})



module.exports = productRouter;
