const bcrypt = require("bcrypt");
const User = require("../models/User");
const { connectToDB } = require("../utils/database");

// Controller function to handle user registration
exports.registerUser = async (req, res) => {
  await connectToDB();
  const { username, name, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = new User({
      username,
      name,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// Controller function to handle user login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  await connectToDB();

  try {
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Authentication failed." });
    }

    req.session.user = user;
    req.session.save();

    res.json({ message: "Login successful." });
  } catch (error) {
    res.status(500).json({
      message: "Error during login. Please check username or password",
      error: error.message,
    });
  }
};

exports.isLoggedIn = (req, res) => {
  console.log(res.session);
  if (req.session.user) {
    const { user } = req.session;
    res.status(200).json({ message: "User is logged in", user });
  } else {
    res.json({ message: "Not logged in" });
  }
};

exports.logout = async (req, res) => {
  console.log("Before destroying session:", req.session);
  await req.session.destroy();

  console.log("After destroying session:", req.session);
  res.send("Logged out");
};
