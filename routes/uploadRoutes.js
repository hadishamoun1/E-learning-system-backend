// routes/uploadRoutes.js
const express = require("express");
const upload = require("../config/multerConfig"); // Adjust path if necessary
const uploadController = require("../controllers/uploadController");
const authMiddleware = require("../middleware/authMiddleware"); // If used
const router = express.Router();

router.post(
  "/",
  //authMiddleware, // Optional: Add if you have authentication middleware
  upload.single("file"), // Ensure 'file' matches the field name in the form
  uploadController.uploadFile
);

module.exports = router;
