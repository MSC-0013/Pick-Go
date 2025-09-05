const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// CREATE booking
router.post("/", (req, res) => {
  const booking = new Booking(req.body);
  booking.save()
    .then(saved => res.status(201).json(saved))
    .catch(err => res.status(400).json({ error: err.message }));
});

// GET all bookings (Admin)
router.get("/", (req, res) => {
  Booking.find()
    .then(bookings => res.json(bookings))
    .catch(err => res.status(500).json({ error: err.message }));
});

// GET booking by userId
router.get("/user/:userId", (req, res) => {
  Booking.find({ userId: req.params.userId })
    .then(bookings => res.json(bookings))
    .catch(err => res.status(500).json({ error: err.message }));
});

// UPDATE booking status/payment
router.put("/:id", (req, res) => {
  Booking.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updated => res.json(updated))
    .catch(err => res.status(400).json({ error: err.message }));
});

// DELETE booking
router.delete("/:id", (req, res) => {
  Booking.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Booking deleted" }))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
