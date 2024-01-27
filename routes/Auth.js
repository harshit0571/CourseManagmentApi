// routes/auth.js

const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { connectToDB } = require("../utils/database");

const router = express.Router();

router.post("/register", async (req, res) => {
  await connectToDB();
  console.log("ddd");
  const { username, name, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ username });
    if (user) {
      res.status(500).json({ message: "User already exists." });
    } else {
      const newUser = new User({
        username,
        name,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  await connectToDB();

  try {
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Authentication failed." });
    }

    req.session.userId = user._id;
    res.json({ message: "Login successful." });
  } catch (error) {
    res.status(500).json({
      message: "Error during login. please check username or password",
    });
  }
});

module.exports = router;
