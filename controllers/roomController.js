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
    const rooms = await Room.find();
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
    const room = await Room.findById(req.params.id);
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
