const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const classRoutes = require("./routes/classRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const authRoutes = require("./routes/auth");
const uploadRoutes = require("./routes/uploadRoutes");
const withdrawalRoutes = require("./routes/withdrawRoutes"); // Correct import
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/elearning")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// CORS options
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Route middlewares
app.use("/users", userRoutes);
app.use("/classes", classRoutes);
app.use("/enrollments", authMiddleware, enrollmentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", withdrawalRoutes); // Correct usage

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
