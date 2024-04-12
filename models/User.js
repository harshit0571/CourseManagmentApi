const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
  },
  // progress: [
  //   {
  //     type: Number,
  //     default: 0,
  //     min: 0,
  //     max: 100,
  //   },
  // ],
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true },
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  selectedCourses: [courseProgressSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
