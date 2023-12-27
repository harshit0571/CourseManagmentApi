const express = require("express");
const Course = require("../models/Course");
const { connectToDB } = require("../utils/database");

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, description, instructor, duration } = req.body;
  await connectToDB();

  try {
    const newCourse = new Course({
      title,
      description,
      instructor,
      duration,
    });

    await newCourse.save();

    res
      .status(201)
      .json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating course", error: error.message });
  }
});

router.get("/", async (req, res) => {
  await connectToDB();
  try {
    const courses = await Course.find();
    res.json({ courses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
  }
});

router.get("/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  await connectToDB();

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ course });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching course details", error: error.message });
  }
});

router.post("/:courseId/modules", async (req, res) => {
  await connectToDB();
  const courseId = req.params.courseId;
  const { moduleTitle, videosArray } = req.body;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Create a new module
    const newModule = {
      title: moduleTitle,
      videos: videosArray,
    };

    // Add the new module to the course
    course.modules.push(newModule);

    // Save the updated course to the database
    await course.save();

    res
      .status(201)
      .json({ message: "Module with video added successfully", course });
  } catch (error) {
    res.status(500).json({
      message: "Error adding module with video",
      error: error.message,
    });
  }
});

module.exports = router;
