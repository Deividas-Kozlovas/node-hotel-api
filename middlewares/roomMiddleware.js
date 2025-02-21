const mongoose = require("mongoose");
const Room = require("../models/roomModel");
const AppError = require("../utils/appError");

exports.validateRoom = (req, res, next) => {
  const {
    number,
    capacity,
    floor,
    room_image,
    pricing,
    wifi,
    parking,
    breakfast,
  } = req.body;

  if (
    !number ||
    !capacity ||
    !floor ||
    !room_image ||
    !pricing ||
    wifi === undefined ||
    parking === undefined ||
    breakfast === undefined
  ) {
    return next(new AppError("Please fill in all fields", 400));
  }

  next();
};

exports.checkRoomID = async (req, res, next, val) => {
  if (!mongoose.Types.ObjectId.isValid(val)) {
    return next(new AppError("Room ID format invalid", 400));
  }

  const room = await Room.findById(val);
  if (!room) {
    return next(new AppError("Room ID is invalid", 404));
  }

  next();
};

exports.validateDates = (req, res, next) => {
  const { checkinDate, checkoutDate } = req.params;

  if (!checkinDate || !checkoutDate) {
    return next(
      new AppError("Check-in and check-out dates are required.", 400)
    );
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(checkinDate) || !dateRegex.test(checkoutDate)) {
    return next(new AppError("Invalid date format. Expected YYYY-MM-DD.", 400));
  }

  const checkin = new Date(checkinDate);
  const checkout = new Date(checkoutDate);

  if (isNaN(checkin.getTime()) || isNaN(checkout.getTime())) {
    return next(new AppError("Invalid date format.", 400));
  }

  if (checkin >= checkout) {
    return next(
      new AppError("Check-out date must be after check-in date.", 400)
    );
  }

  next();
};
