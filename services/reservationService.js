const reservationRepository = require("../repositories/reservationRepository");

const createReservation = async (reservationData) => {
  if (
    !reservationData.room ||
    !reservationData.checkin ||
    !reservationData.checkout ||
    !reservationData.name
  ) {
    throw new Error("Missing required fields: room, checkin, checkout, name");
  }

  const checkinDate = new Date(reservationData.checkin);
  const checkoutDate = new Date(reservationData.checkout);

  if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
    throw new Error("Invalid check-in or check-out date format.");
  }

  if (checkinDate >= checkoutDate) {
    throw new Error("Check-out date must be after check-in date.");
  }

  return await reservationRepository.createReservation(reservationData);
};

const getAllReservations = async (query) => {
  const reservations = await reservationRepository.getAllReservations(query);

  if (reservations.length === 0) {
    throw new Error("No reservations found matching the criteria.");
  }

  return reservations;
};

const getReservationById = async (reservationId) => {
  const reservation = await reservationRepository.getReservationById(
    reservationId
  );

  if (!reservation) {
    throw new Error("No reservation found with this ID.");
  }

  return reservation;
};

const updateReservation = async (reservationId, updateData) => {
  return await reservationRepository.updateReservation(
    reservationId,
    updateData
  );
};

const deleteReservation = async (reservationId) => {
  return await reservationRepository.deleteReservation(reservationId);
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};
