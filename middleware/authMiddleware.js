const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "hadi"); // Ensure 'hadi' matches your JWT secret
    const user = await User.findById(decoded.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach user to request object
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
