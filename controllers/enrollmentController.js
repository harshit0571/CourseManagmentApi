const User = require("../models/User");
const Course = require("../models/Course");
const { connectToDB } = require("../utils/database");

// Controller function to enroll in a course
exports.enrollInCourse = async (req, res) => {
  const courseId = req.params.courseid;
  const username = req.params.username;
  await connectToDB();
  try {
    // Check if the user is logged in
    // if (!req.session.userId) {
    //   return res.status(401).json({ message: "Not logged in" });
    // }
    console.log(courseId, username, "hello");

    // Find the user who is enrolling in the course
    const user = await User.findOne({ username: username });
    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }
    // Check if the course exists
    const course = await Course.findById(courseId);
    // console.log(course);
    // console.log(course);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the user is already enrolled in the course
    if (user.selectedCourses.includes(courseId)) {
      return res
        .status(400)
        .json({ message: "User is already enrolled in this course" });
    }
    const selected = {
      courseId: courseId, // Add the courseId to the course progress object
    };

    // Enroll the user in the course

    user.selectedCourses.push(selected);

    // Save the updated user to the database
    await user.save();

    res.status(200).json({ message: "success", user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error during enrollment", error: error.message });
  }
};
