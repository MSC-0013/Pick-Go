const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },      // e.g. Tesla Model 3
    brand: { type: String, required: true },     // e.g. Tesla
    pricePerDay: { type: Number, required: true },
    image: { type: String },                     // URL to car image
    seats: { type: Number, default: 4 },
    range: { type: Number },                     // km per charge
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
