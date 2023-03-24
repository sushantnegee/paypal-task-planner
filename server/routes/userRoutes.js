const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(400);
      throw new Error("user already exists");
    }

    // hashing password using bycrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: (await user).name,
        email: user.email,
        token: generateToken(user._id), // using jwt and method is in config/generateToken.js
      });
    } else {
      throw new Error("Faild to Create User");
    }
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;