const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../Controllers/UserController");
const { protect } = require("../middleware/authMiddleware");

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get user profile
router.get("/profile", protect, getUserProfile);

module.exports = router;
