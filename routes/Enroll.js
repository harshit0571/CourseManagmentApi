// routes/users.js

const express = require("express");
const User = require("../models/User");
const Course = require("../models/Course");
const { connectToDB } = require("../utils/database");

const router = express.Router();

// Enroll in a course
router.post("/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  await connectToDB();
  try {
    // Check if the user is logged in
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not logged in" });
    }

    // Find the user who is enrolling in the course
    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the course exists
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the user is already enrolled in the course
    if (user.selectedCourses.includes(courseId)) {
      return res
        .status(400)
        .json({ message: "User is already enrolled in this course" });
    }

    // Enroll the user in the course
    user.selectedCourses.push(courseId);

    // Save the updated user to the database
    await user.save();

    res.status(200).json({ message: "Enrollment successful", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during enrollment", error: error.message });
  }
});

module.exports = router;
