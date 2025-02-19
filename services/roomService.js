const roomRepository = require("../repositories/roomRepository");
const AppError = require("../utils/appError");

const createRoom = async (roomData) => {
  if (!roomData.number || !roomData.capacity) {
    throw new AppError("Room number and capacity are required.", 400);
  }

  if (roomData.capacity < 1) {
    throw new AppError("Capacity must be at least 1.", 400);
  }

  const existingRoom = await roomRepository.getRoomByNumber(roomData.number);
  if (existingRoom) {
    throw new AppError("Room number already exists.", 400);
  }

  return await roomRepository.createRoom(roomData);
};

const getAllRooms = async () => {
  return await roomRepository.getAllRooms();
};

const getRoomById = async (roomId) => {
  if (!roomId) {
    throw new AppError("Room ID is required.", 400);
  }

  const room = await roomRepository.getRoomById(roomId);
  if (!room) {
    throw new AppError("Room not found.", 404);
  }

  return room;
};

const updateRoom = async (roomId, updateData) => {
  if (!roomId) {
    throw new AppError("Room ID is required.", 400);
  }

  const room = await roomRepository.getRoomById(roomId);
  if (!room) {
    throw new AppError("No room found to update.", 404);
  }

  return await roomRepository.updateRoom(roomId, updateData);
};

const deleteRoom = async (roomId) => {
  if (!roomId) {
    throw new AppError("Room ID is required.", 400);
  }

  const room = await roomRepository.getRoomById(roomId);
  if (!room) {
    throw new AppError("No room found to delete.", 404);
  }

  return await roomRepository.deleteRoom(roomId);
};

const checkRoomAvailability = async (checkinDate, checkoutDate) => {
  if (!checkinDate || !checkoutDate) {
    throw new AppError("Check-in and check-out dates are required.", 400);
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(checkinDate) || !dateRegex.test(checkoutDate)) {
    throw new AppError("Invalid date format. Expected YYYY-MM-DD.", 400);
  }

  const checkin = new Date(checkinDate);
  const checkout = new Date(checkoutDate);

  if (isNaN(checkin.getTime()) || isNaN(checkout.getTime())) {
    throw new AppError("Invalid date format.", 400);
  }

  if (checkin >= checkout) {
    throw new AppError("Check-out date must be after check-in date.", 400);
  }

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
