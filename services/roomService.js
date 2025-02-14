const roomRepository = require("../repositories/roomRepository");

const createRoom = async (roomData) => {
  if (!roomData.number || !roomData.capacity) {
    throw new Error("Room number and capacity are required.");
  }

  if (roomData.capacity < 1) {
    throw new Error("Capacity must be at least 1.");
  }

  // Check if room number already exists
  const existingRoom = await roomRepository.getRoomByNumber(roomData.number);
  if (existingRoom) {
    throw new Error("Room number already exists.");
  }

  return await roomRepository.createRoom(roomData);
};

const getAllRooms = async () => {
  return await roomRepository.getAllRooms();
};

const getRoomById = async (roomId) => {
  if (!roomId) {
    throw new Error("Room ID is required.");
  }

  const room = await roomRepository.getRoomById(roomId);
  if (!room) {
    throw new Error("Room not found.");
  }

  return room;
};

const updateRoom = async (roomId, updateData) => {
  if (!roomId) {
    throw new Error("Room ID is required.");
  }

  const room = await roomRepository.getRoomById(roomId);
  if (!room) {
    throw new Error("No room found to update.");
  }

  return await roomRepository.updateRoom(roomId, updateData);
};

const deleteRoom = async (roomId) => {
  if (!roomId) {
    throw new Error("Room ID is required.");
  }

  const room = await roomRepository.getRoomById(roomId);
  if (!room) {
    throw new Error("No room found to delete.");
  }

  return await roomRepository.deleteRoom(roomId);
};

const checkRoomAvailability = async (checkinDate, checkoutDate) => {
  if (!checkinDate || !checkoutDate) {
    throw new Error("Check-in and check-out dates are required.");
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(checkinDate) || !dateRegex.test(checkoutDate)) {
    throw new Error("Invalid date format. Expected YYYY-MM-DD.");
  }

  const checkin = new Date(checkinDate);
  const checkout = new Date(checkoutDate);

  if (isNaN(checkin.getTime()) || isNaN(checkout.getTime())) {
    throw new Error("Invalid date format.");
  }

  if (checkin >= checkout) {
    throw new Error("Check-out date must be after check-in date.");
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
