// models/Course.js

const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const QuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
    enum: ["MCQ", "SubmissionLink"],
    required: true,
  },
  options: {
    type: [String],
    required: function () {
      return this.questionType === "MCQ";
    },
  },
  correctAnswer: {
    type: String,
    required: function () {
      return this.questionType === "MCQ";
    },
  },
  submissionLink: {
    type: String,
    required: function () {
      return this.questionType === "SubmissionLink";
    },
  },
});

const AssignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  questions: [QuestionSchema],
});

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  videos: [videoSchema],
  assignments: [AssignmentSchema],
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  modules: [moduleSchema],
  img: {
    type: String,
    required: false,
  },
  resources: {
    type: [String],
    required: false,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
