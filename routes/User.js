const express = require("express");
const User = require("../models/User");
const { connectToDB } = require("../utils/database");

const router = express.Router();

router.get("/:username", async (req, res) => {
  await connectToDB();
  const username = req.params.username;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(400).json({ message: "user does not exists" });
    }

    return res.json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user details", error: error.message });
  }
});

module.exports = router;
