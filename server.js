const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const classRoutes = require("./routes/classRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");

const app = express();

mongoose
  .connect("mongodb://localhost/elearning")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/users", userRoutes);
app.use("/classes", classRoutes);
app.use("/enrollments", enrollmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
