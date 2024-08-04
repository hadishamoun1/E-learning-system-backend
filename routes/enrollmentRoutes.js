const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

router.post('/', enrollmentController.createEnrollment);
router.get('/', enrollmentController.getEnrollments);

// Add more routes as needed

module.exports = router;
