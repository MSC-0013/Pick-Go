const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },

  carId: { type: Number, required: true }, 
  carName: { type: String, required: true },
  carImage: { type: String },
  carBrand: { type: String },

  pricePerDay: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  pickupLocation: { type: String, required: true },
  dropoffLocation: { type: String, required: true },
  additionalRequests: { type: String },

  totalDays: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },

  status: { type: String, default: "confirmed" }, // confirmed, cancelled, completed
  paymentStatus: { type: String, default: "paid" }, // paid, pending
  bookingDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
