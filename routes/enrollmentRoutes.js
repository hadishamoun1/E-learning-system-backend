const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollmentController");

router.post("/", enrollmentController.createEnrollment);
router.get("/", enrollmentController.getEnrollments);

router.get("/class/:classId/students", enrollmentController.getStudentsByClass);
router.get("/user/:userId/classes", enrollmentController.getClassesByUser);
router.delete("/:id", enrollmentController.deleteEnrollment);

module.exports = router;
