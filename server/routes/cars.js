const express = require("express");
const Car = require("../models/Car");
const router = express.Router();

// Get all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
