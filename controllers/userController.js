const User = require("../models/User");
const { connectToDB } = require("../utils/database");

// Controller function to get user details by username
exports.getUserByUsername = async (req, res) => {
  await connectToDB();
  const username = req.params.username;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    return res.json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user details", error: error.message });
  }
};
