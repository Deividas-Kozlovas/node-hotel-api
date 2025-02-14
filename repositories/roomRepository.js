const Room = require("../models/roomModel");

const createRoom = async (roomData) => {
  return await Room.create(roomData);
};

const getAllRooms = async () => {
  return await Room.find()
    .populate({ path: "reservations", select: "checkin checkout" })
    .select("number capacity floor room_image pricing wifi parking breakfast");
};

const getRoomById = async (roomId) => {
  return await Room.findById(roomId)
    .populate({ path: "reservations", select: "checkin checkout" })
    .select("number capacity floor room_image pricing wifi parking breakfast");
};

const updateRoom = async (roomId, updateData) => {
  return await Room.findByIdAndUpdate(roomId, updateData, {
    new: true,
    runValidators: true,
  });
};

const deleteRoom = async (roomId) => {
  return await Room.findByIdAndDelete(roomId);
};

const checkRoomAvailability = async (checkin, checkout) => {
  const rooms = await Room.find().populate("reservations");

  const availableRooms = rooms.map((room) => {
    let isAvailable = true;
    if (room.reservations && room.reservations.length > 0) {
      for (let reservation of room.reservations) {
        const reservationCheckin = new Date(reservation.checkin);
        const reservationCheckout = new Date(reservation.checkout);

        if (
          (checkin >= reservationCheckin && checkin < reservationCheckout) ||
          (checkout > reservationCheckin && checkout <= reservationCheckout) ||
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

  return availableRooms;
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  checkRoomAvailability,
};
