const mongoose = require("mongoose");
const Class = require("../models/Class");

// Create a new class
exports.createClass = async (req, res) => {
  try {
    const classItem = new Class(req.body);
    await classItem.save();
    res.status(201).json(classItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all classes
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a specific class by ID
exports.getClassById = async (req, res) => {
  try {
    // Extract ID from request parameters
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Query the database
    const classItem = await Class.findById(id);
    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json(classItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a class by ID
exports.updateClass = async (req, res) => {
  try {
    const classItem = await Class.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json(classItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a class by ID
exports.deleteClass = async (req, res) => {
  try {
    const classItem = await Class.findByIdAndDelete(req.params.id);
    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
