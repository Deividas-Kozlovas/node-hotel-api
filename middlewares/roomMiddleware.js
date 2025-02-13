const mongoose = require("mongoose");
const Room = require("../models/roomModel");

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
    (!number,
    !capacity,
    !floor,
    !room_image,
    !pricing,
    !wifi,
    !parking,
    !breakfast)
  ) {
    return res.status(400).json({
      status: "fail",
      message: "Please fill in all fields",
    });
  }

  next();
};

exports.checkRoomID = async (req, res, next, val) => {
  if (!mongoose.Types.ObjectId.isValid(val)) {
    return res.status(400).json({
      status: "fail",
      message: "Room ID format invalid",
    });
  }

  const room = await Room.findById(val);
  if (!room) {
    return res.status(404).json({
      status: "fail",
      message: "Room ID is invalid",
    });
  }

  next();
};
