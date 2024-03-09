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

exports.getUsers = async (req, res) => {
  await connectToDB();

  try {
    const user = await User.find();

    return res.json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user details", error: error.message });
  }
};

// exports.updateProgress = async (req, res) => {
//   const { username } = req.params;
//   const { courseId, moduleId, progress } = req.body;

//   try {
//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Find the index of the selected course
//     const courseIndex = user.selectedCourses.findIndex(
//       (course) => course.courseId.toString() === courseId
//     );
//     if (courseIndex === -1) {
//       return res.status(404).json({ message: "Course not found for the user" });
//     }

//     // Update progress
//     user.selectedCourses[courseIndex].progress.push(progress);
//     await user.save();

//     res.status(200).json({ message: "Progress updated successfully", user });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error updating progress", error: error.message });
//   }
// };
