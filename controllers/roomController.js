const roomService = require("../services/roomService");

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.status(200).json({ status: "success", data: rooms });
  } catch (err) {
    next(err);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const room = await roomService.getRoomById(req.params.id);
    res.status(200).json({ status: "success", data: room });
  } catch (err) {
    next(err);
  }
};

const createRoom = async (req, res, next) => {
  try {
    const newRoom = await roomService.createRoom(req.body);

    res.status(201).json({ status: "success", data: newRoom });
  } catch (err) {
    next(err);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await roomService.updateRoom(req.params.id, req.body);
    res.status(200).json({ status: "success", data: updatedRoom });
  } catch (err) {
    next(err);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    await roomService.deleteRoom(req.params.id);
    res.status(204).json({ status: "success" });
  } catch (err) {
    next(err);
  }
};

const getAvailableRooms = async (req, res, next) => {
  try {
    const { checkinDate, checkoutDate } = req.params;
    const availableRooms = await roomService.checkRoomAvailability(
      checkinDate,
      checkoutDate
    );
    res.status(200).json({ status: "success", data: availableRooms });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  getAvailableRooms,
};
