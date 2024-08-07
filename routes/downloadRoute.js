const express = require("express");
const router = express.Router();

// Assuming `bucket` is initialized in your controller file
const { GridFSBucket } = require("mongodb");
const mongoose = require("mongoose");
const conn = mongoose.connection;
let bucket;

conn.once("open", () => {
  bucket = new GridFSBucket(conn.db, { bucketName: "uploads" });
});

// Serve file from GridFS
router.get("/files/:filename", (req, res) => {
  const { filename } = req.params;
  const downloadStream = bucket.openDownloadStreamByName(filename);

  downloadStream.on("data", (chunk) => {
    res.write(chunk);
  });

  downloadStream.on("end", () => {
    res.end();
  });

  downloadStream.on("error", (err) => {
    console.error("Error downloading file:", err);
    res.status(404).json({ message: "File not found." });
  });
});

module.exports = router;
