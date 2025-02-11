const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Guest name is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  zip: {
    type: String,
    required: [true, "ZIP code is required"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  checkin: {
    type: Date,
    required: [true, "Check-in date is required"],
  },
  checkout: {
    type: Date,
    required: [true, "Check-out date is required"],
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
