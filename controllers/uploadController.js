// controllers/uploadController.js
const { GridFSBucket } = require("mongodb");
const mongoose = require("mongoose");
const path = require("path");
const File = require("../models/File");

const conn = mongoose.connection;
let bucket;

conn.once("open", () => {
  console.log("MongoDB connection opened. Initializing GridFS bucket...");
  bucket = new GridFSBucket(conn.db, { bucketName: "uploads" });
  console.log("GridFS bucket initialized.");
});

exports.uploadFile = async (req, res) => {
  console.log("Received file upload request...");
  if (!req.file) {
    console.error("No file uploaded.");
    return res.status(400).json({ message: "No file uploaded." });
  }

  const file = req.file;
  const fileName = Date.now() + path.extname(file.originalname);
  console.log("Uploading file:", fileName);

  const uploadStream = bucket.openUploadStream(fileName, {
    contentType: file.mimetype,
  });

  uploadStream.end(file.buffer);

  uploadStream.on("finish", async () => {
    console.log("File uploaded successfully:", fileName);

    // Save file metadata in the `files` collection
    try {
      const fileData = new File({
        filename: fileName,
        path: `uploads/${fileName}`, // Path here is just a placeholder
        uploadedBy: req.user ? req.user._id : null, // Ensure req.user is set by your auth middleware
        class: req.body.classId, // Ensure classId is provided
      });

      await fileData.save();
      res
        .status(200)
        .json({
          message: "File uploaded successfully!",
          file: { filename: fileName },
        });
    } catch (error) {
      console.error("Error saving file metadata:", error);
      res.status(500).json({ message: "Error saving file metadata." });
    }
  });

  uploadStream.on("error", (err) => {
    console.error("Error uploading file:", err);
    res.status(500).json({ message: "Error uploading file." });
  });
};
