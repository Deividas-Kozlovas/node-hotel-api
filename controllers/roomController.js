const Room = require("../models/roomModel");

exports.createRoom = async (req, res) => {
  try {
    const newRoom = await Room.create(req.body);
    res.status(201).json({
      status: "success",
      data: newRoom,
    });
  } catch (err) {
    console.error("Error creating room:", err);
    res.status(400).json({
      status: "fail",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Invalid data. Please check your input.",
    });
  }
};

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
      .populate({
        path: "reservations",
        select: "checkin checkout",
      })
      .select(
        "number capacity floor room_image pricing wifi parking breakfast"
      );

    res.status(200).json({
      status: "success",
      results: rooms.length,
      data: { rooms },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Error fetching rooms",
    });
  }
};

exports.getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate({
        path: "reservations",
        select: "checkin checkout",
      })
      .select(
        "number capacity floor room_image pricing wifi parking breakfast"
      );

    if (!room) {
      return res.status(404).json({
        status: "fail",
        message: "No room with this ID was found",
      });
    }

    res.status(200).json({
      status: "success",
      data: { room },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Error fetching the room",
    });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      return res.status(404).json({
        status: "fail",
        message: "No room found to delete",
      });
    }

    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Error deleting room, please try later",
    });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedRoom) {
      return res.status(404).json({
        status: "fail",
        message: "No room found to update",
      });
    }

    res.status(200).json({
      status: "success",
      data: { updatedRoom },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Error updating room, please try later",
    });
  }
};

exports.getAvailableRooms = async (req, res) => {
  try {
    const { checkinDate, checkoutDate } = req.params;

    if (!checkinDate || !checkoutDate) {
      return res.status(400).json({
        status: "fail",
        message: "Checkin and checkout dates are required",
      });
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(checkinDate) || !dateRegex.test(checkoutDate)) {
      return res.status(400).json({
        status: "fail",
        message: "Bad checkin or checkout date format. Expected YYYY-MM-DD",
      });
    }

    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);

    if (isNaN(checkin.getTime()) || isNaN(checkout.getTime())) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid date format",
      });
    }

    const rooms = await Room.find().populate("reservations");

    const availableRooms = rooms.map((room) => {
      let isAvailable = true;

      if (room.reservations && room.reservations.length > 0) {
        for (let reservation of room.reservations) {
          const reservationCheckin = new Date(reservation.checkin);
          const reservationCheckout = new Date(reservation.checkout);

          if (
            (checkin >= reservationCheckin && checkin < reservationCheckout) ||
            (checkout > reservationCheckin &&
              checkout <= reservationCheckout) ||
            (checkin < reservationCheckin && checkout > reservationCheckout)
          ) {
            isAvailable = false;
            break;
          }
        }
      }

      return {
        id: room._id,
        number: room.number,
        availability: isAvailable,
      };
    });

    res.status(200).json({
      status: "success",
      rooms: availableRooms,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Error checking room availability",
    });
  }
};
