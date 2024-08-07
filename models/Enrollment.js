const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  enrolledAt: { type: Date, default: Date.now },
});

// Ensure unique enrollment
EnrollmentSchema.index({ user: 1, class: 1 }, { unique: true });

module.exports = mongoose.model("Enrollment", EnrollmentSchema);
