
const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    instructor: { type: String, required: true }
});

module.exports = mongoose.model('Class', ClassSchema);
