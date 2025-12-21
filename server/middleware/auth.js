const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Access denied.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;

    // Verify user still exists
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Access denied.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    if (
      !req.userRole ||
      (req.userRole !== "admin" && req.userRole !== "superadmin")
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }
    next();
  } catch (error) {
    console.error("Authorization check error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error during authorization check.",
    });
  }
};

module.exports = { verifyToken, isAdmin };
