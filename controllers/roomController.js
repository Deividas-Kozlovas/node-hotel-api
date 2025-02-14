const roomService = require("../services/roomService");

exports.createRoom = async (req, res) => {
  try {
    const newRoom = await roomService.createRoom(req.body);
    res.status(201).json({ status: "success", data: newRoom });
  } catch (err) {
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
    const rooms = await roomService.getAllRooms();
    res
      .status(200)
      .json({ status: "success", results: rooms.length, data: { rooms } });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Error fetching rooms. Please try again later.",
    });
  }
};

exports.getRoom = async (req, res) => {
  try {
    const room = await roomService.getRoomById(req.params.id);
    if (!room) {
      return res.status(404).json({
        status: "fail",
        message: "No room found with this ID.",
      });
    }
    res.status(200).json({ status: "success", data: { room } });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Error fetching room details. Please try again later.",
    });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const updatedRoom = await roomService.updateRoom(req.params.id, req.body);
    if (!updatedRoom) {
      return res.status(404).json({
        status: "fail",
        message: "No room found with this ID.",
      });
    }
    res.status(200).json({ status: "success", data: { updatedRoom } });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Invalid update data. Please check your input.",
    });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await roomService.deleteRoom(req.params.id);
    if (!deletedRoom) {
      return res.status(404).json({
        status: "fail",
        message: "No room found with this ID.",
      });
    }
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Error deleting room. Please try again later.",
    });
  }
};

exports.getAvailableRooms = async (req, res) => {
  try {
    const { checkinDate, checkoutDate } = req.params;
    const availableRooms = await roomService.checkRoomAvailability(
      checkinDate,
      checkoutDate
    );
    res.status(200).json({ status: "success", rooms: availableRooms });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Invalid date format. Please use YYYY-MM-DD.",
    });
  }
};
