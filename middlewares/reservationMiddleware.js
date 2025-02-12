const mongoose = require("mongoose");
const Room = require("../models/roomModel");

exports.validateReservation = (req, res, next) => {
    const { name, address, city, zip, country, checkin, checkout } = req.body;
  
    if (
      !name ||
      !address ||
      !city ||
      !zip ||
      !country ||
      !checkin ||
      !checkout
    ) {
      return res.status(400).json({
        status: "failed",
        message: "Please fill in all required fields",
      });
    }
  
    next();
  };

exports.checkReservationID = async (req, res, next, val) => {
    if (!mongoose.Types.ObjectId.isValid(val)) {
      return res.status(400).json({
        status: "failed",
        message: "Reservation ID format invalid",
      });
    }
  
    const reservation = await Reservation.findById(val);
    if (!reservation) {
      return res.status(404).json({
        status: "failed",
        message: "Reservation ID is invalid",
      });
    }
  
    next();
  };

  