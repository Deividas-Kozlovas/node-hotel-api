const AppError = require("../utils/appError");

const reservationRepository = require("../repositories/reservationRepository");

const createReservation = async (reservationData) => {
  if (
    !reservationData.room ||
    !reservationData.checkin ||
    !reservationData.checkout ||
    !reservationData.name
  ) {
    throw new AppError(
      "Missing required fields: room, checkin, checkout, name",
      400
    );
  }

  const checkinDate = new Date(reservationData.checkin);
  const checkoutDate = new Date(reservationData.checkout);

  if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
    throw new AppError("Invalid check-in or check-out date format.", 400);
  }

  if (checkinDate >= checkoutDate) {
    throw new AppError("Check-out date must be after check-in date.", 400);
  }

  return await reservationRepository.createReservation(reservationData);
};

const getAllReservations = async (query) => {
  const reservations = await reservationRepository.getAllReservations(query);

  if (reservations.length === 0) {
    throw new AppError("No reservations found matching the criteria.", 404);
  }

  return reservations;
};

const getReservationById = async (reservationId) => {
  const reservation = await reservationRepository.getReservationById(
    reservationId
  );

  if (!reservation) {
    throw new AppError("No reservation found with this ID.", 404);
  }

  return reservation;
};

const updateReservation = async (reservationId, updateData) => {
  const reservation = await reservationRepository.getReservationById(
    reservationId
  );

  if (!reservation) {
    throw new AppError("No reservation found with this ID.", 404);
  }

  return await reservationRepository.updateReservation(
    reservationId,
    updateData
  );
};

const deleteReservation = async (reservationId) => {
  const reservation = await reservationRepository.getReservationById(
    reservationId
  );

  if (!reservation) {
    throw new AppError("No reservation found with this ID.", 404);
  }

  return await reservationRepository.deleteReservation(reservationId);
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};
