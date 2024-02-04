const Course = require("../models/Course");
const { connectToDB } = require("../utils/database");

// Controller function to create a new course
exports.createCourse = async (req, res) => {
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
};

// Controller function to get all courses
exports.getAllCourses = async (req, res) => {
  await connectToDB();
  try {
    const courses = await Course.find();
    res.json({ courses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
  }
};

// Controller function to get a single course by ID
exports.getCourseById = async (req, res) => {
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
};

// Controller function to add module with video and/or assignment to a course
exports.addModuleToCourse = async (req, res) => {
  await connectToDB();
  const courseId = req.params.courseId;
  const { moduleTitle, videosArray, assignmentTitle, questions } = req.body;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const newModule = {
      title: moduleTitle,
      videos: videosArray,
    };

    if (assignmentTitle && questions) {
      const newAssignment = {
        title: assignmentTitle,
        questions: questions,
      };
      newModule.assignments = [newAssignment];
    }

    course.modules.push(newModule);

    await course.save();

    res.status(201).json({
      message: "Module with video and/or assignment added successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding module with video and/or assignment",
      error: error.message,
    });
  }
};
