const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the resource schema
const resourceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["video", "document"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// Create a model from the schema
const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;
