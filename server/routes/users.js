const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Get all users (Admin)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    
    // Map fields to match frontend expectations
    const formattedUsers = users.map(u => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      role: u.isAdmin ? "admin" : "user",
      registrationDate: u.createdAt,
    }));

    res.json(formattedUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
