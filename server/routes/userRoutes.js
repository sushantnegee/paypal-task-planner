const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name)
    const userExists = await User.findOne({email });
    if (userExists) {
      res.status(400);
      throw new Error("user already exists");
    }

    // hashing password using bycrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id), // using jwt and method is in config/generateToken.js
      });
    } else {
      throw new Error("Failed to Create User");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post('/login',async (req,res)=>{
  try {
    const {email,password} = req.body;

    const user = await User.findOne({email})
    if(!user){
      res.status(401);
      throw new Error('Invalid Id or Password')
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
      return res.status(400).json({message: 'Invalid credentials'})
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), // using jwt and method is in config/generateToken.js
    });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
})


module.exports = router;