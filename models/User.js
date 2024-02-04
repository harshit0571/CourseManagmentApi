const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true },
  password: String,
  selectedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  //progress
  
});

const User = mongoose.model("User", userSchema);

module.exports = User;
