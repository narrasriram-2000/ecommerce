const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema.js");
const validation = require("./validation.js");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middleware/user.js");


const authRouter = express.Router();


authRouter.post("/signup", async (req, res) => {
  try {
    // validation(req);

    const { firstName, lastName, email, password,role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role
    });

    await data.save();
    // console.log(data);

    res.status(200).send("Signup successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong during signup");
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await User.findOne({ email });
    if (!data) {
      throw new Error("Email is invalid");
    }
    const isPassword = await bcrypt.compare(password, data.password);
    if (!isPassword) {
      throw new Error("Password is invalid");
    }

    const token = await data.getJWT();

    res.cookie("token", token);

    res.status(200).json({ message: 'Logged in successfully', data: { id: data._id, name: data.firstName, email: data.email ,role: data.role} });
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    await res.clearCookie("token");
    res.send("logout Successfull");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

module.exports = authRouter;
