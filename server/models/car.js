const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },     
    brand: { type: String, required: true },    
    pricePerDay: { type: Number, required: true },
    image: { type: String },                   
    seats: { type: Number, default: 4 },
    range: { type: Number },                   
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
