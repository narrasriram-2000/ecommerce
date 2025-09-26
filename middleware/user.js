const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema.js");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send('Access denied. No token provided.');
    }

    const decoded = jwt.verify(token, "tom@1234");

    const _id = decoded._id;
    
    const data = await User.findById(_id);

    req.userId = data._id;

    if (!data) {
      console.error("user does not exist");
      return res.status(404).send("User does not exist");
    }

    req.data = data;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

module.exports = { userAuth };

