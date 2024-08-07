const Enrollment = require("../models/Enrollment");
const Class = require("../models/Class");

exports.createEnrollment = async (req, res) => {
  try {
    const { class: classId, user: userId } = req.body;

    // Check if the class exists
    const classItem = await Class.findById(classId);
    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }

    const existingEnrollment = await Enrollment.findOne({
      user: userId,
      class: classId,
    });
    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: "User is already enrolled in this class" });
    }

    const enrollment = new Enrollment({
      user: userId,
      class: classId,
    });
    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate("class");
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getStudentsByClass = async (req, res) => {
  try {
    const { classId } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ message: "Invalid class ID format" });
    }

    
    const enrollments = await Enrollment.find({ class: classId }).populate("user");
    
   
    if (enrollments.length === 0) {
      return res.status(404).json({ message: "No students enrolled in this class" });
    }

    // Extract user details
    const students = enrollments.map(enrollment => enrollment.user);

    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getClassesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate the user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Find enrollments for the user
    const enrollments = await Enrollment.find({ user: userId }).populate("class");

    // If no enrollments found
    if (enrollments.length === 0) {
      return res.status(404).json({ message: "No classes found for this user" });
    }

    // Extract class details
    const classes = enrollments.map(enrollment => enrollment.class);

    res.status(200).json(classes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ensure this function is included in your enrollmentController.js
exports.deleteEnrollment = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the enrollment ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid enrollment ID format" });
    }

    // Find and delete the enrollment
    const enrollment = await Enrollment.findByIdAndDelete(id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.status(200).json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

