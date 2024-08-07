// models/Class.js
const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    instructor: { type: String, required: true },
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Track enrolled students
});

module.exports = mongoose.model('Class', ClassSchema);
