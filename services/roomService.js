const Room = require("../models/roomModel");

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

module.exports = { checkRoomAvailability };
