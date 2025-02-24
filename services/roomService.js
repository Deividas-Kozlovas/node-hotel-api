const roomRepository = require("../repositories/roomRepository");
const { getCache, setCache, clearCache } = require("../utils/cache");
const AppError = require("../utils/appError");

const cacheKey = "allRooms";

const createRoom = async (roomData) => {
  const existingRoom = await roomRepository.getRoomByNumber(roomData.number);
  if (existingRoom) {
    throw new AppError("Room number already exists.", 400);
  }

  const newRoom = await roomRepository.createRoom(roomData);

  await clearCache(cacheKey);

  return newRoom;
};

const getAllRooms = async () => {
  const cachedRooms = await getCache(cacheKey);
  if (cachedRooms) {
    return cachedRooms;
  }

  const rooms = await roomRepository.getAllRooms();

  if (rooms.length === 0) {
    throw new AppError("No rooms found.", 404);
  }

  await setCache(cacheKey, rooms);

  return rooms;
};

const getRoomById = async (roomId) => {
  return await roomRepository.getRoomById(roomId);
};

const updateRoom = async (roomId, updateData) => {
  const room = await roomRepository.getRoomById(roomId);
  if (!room) {
    throw new AppError("No room found to update.", 404);
  }

  const updatedRoom = await roomRepository.updateRoom(roomId, updateData);

  await clearCache(cacheKey);

  return updatedRoom;
};

const deleteRoom = async (roomId) => {
  const room = await roomRepository.getRoomById(roomId);
  if (!room) {
    throw new AppError("No room found to delete.", 404);
  }

  const deletedRoom = await roomRepository.deleteRoom(roomId);

  await clearCache(cacheKey);

  return deletedRoom;
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
