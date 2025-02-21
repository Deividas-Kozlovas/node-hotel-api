const roomRepository = require("../repositories/roomRepository");
const AppError = require("../utils/appError");

const createRoom = async (roomData) => {
  const existingRoom = await roomRepository.getRoomByNumber(roomData.number);
  if (existingRoom) {
    throw new AppError("Room number already exists.", 400);
  }

  return await roomRepository.createRoom(roomData);
};

const getAllRooms = async () => {
  const rooms = await roomRepository.getAllRooms();

  if (rooms.length === 0) {
    throw new AppError("No rooms found.", 404);
  }

  return rooms;
};

const getRoomById = async (roomId) => {
  const room = await roomRepository.getRoomById(roomId);
  return room;
};

const updateRoom = async (roomId, updateData) => {
  const room = await roomRepository.getRoomById(roomId);
  if (!room) {
    throw new AppError("No room found to update.", 404);
  }

  return await roomRepository.updateRoom(roomId, updateData);
};

const deleteRoom = async (roomId) => {
  const room = await roomRepository.getRoomById(roomId);
  if (!room) {
    throw new AppError("No room found to delete.", 404);
  }

  return await roomRepository.deleteRoom(roomId);
};

const checkRoomAvailability = async (checkinDate, checkoutDate) => {
  const checkin = new Date(checkinDate);
  const checkout = new Date(checkoutDate);

  return await roomRepository.checkRoomAvailability(checkin, checkout);
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  checkRoomAvailability,
};
