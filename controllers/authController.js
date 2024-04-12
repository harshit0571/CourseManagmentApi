const bcrypt = require("bcrypt");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const { connectToDB } = require("../utils/database");

// Controller function to handle user registration
exports.registerUser = async (req, res) => {
  await connectToDB();
  const { username, name, password, email } = req.body;

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
      email,
    });
    await newUser.save();

    res.status(201).json({ message: "true" });
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
    console.log(req.sessionID);
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
  console.log(req.sessionID);

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

exports.forgotPassword = async (req, res) => {
  await connectToDB();
  try {
    // 1. Get the user's email address from the request
    const { email } = req.body;
    console.log(email);
    // 2. Generate a unique reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // 3. Find the user by email and update the reset token
    const user = await User.findOneAndUpdate(
      { email },
      {
        resetPasswordToken: resetToken,
        resetPasswordExpires: Date.now() + 3600000, // Token expires in 1 hour
      }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 4. Send an email with the reset link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: false,
      auth: {
        user: "harakshbrar@gmail.com",
        pass: "aktkdjuvfuxbgxvk",
      },
    });
    const mailOptions = {
      from: "harakshbrar@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        https://coursesforcareers.tech/reset/${resetToken}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updatePassword = async (req, res) => {
  await connectToDB(); // Connect to the database

  try {
    // 1. Get the reset token and new password from the request body
    const { resetToken, newPassword } = req.body;

    // 2. Find the user by reset token
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() }, // Check if token is not expired
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // 3. Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4. Update the user's password and reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // 5. Save the updated user document
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
