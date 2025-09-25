const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema.js");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token; // safe access

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, "tom@1234");
    } catch (jwtError) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }

    const user = await User.findById(decoded._id);

    if (!user) {
      console.error("User does not exist");
      return res.status(404).json({ message: "User does not exist" });
    }

    req.user = user; 
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { userAuth };
