// External Module
const express = require("express");

// Local Module
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const adminController = require("../controllers/adminController");
const protectedRoutes = express.Router();

// Any authenticated user can access this endpoint.
protectedRoutes.get("/dashboard", authMiddleware, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to your dashboard.",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
});

// Only admins can access this end-point.
protectedRoutes.get("/admin", authMiddleware, roleMiddleware("admin"), adminController.getAdminDashboard);

module.exports = protectedRoutes;