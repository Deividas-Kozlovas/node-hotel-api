const Reservation = require("../models/reservationModel");
const Room = require("../models/roomModel");

const createReservation = async (reservationData) => {
  const newReservation = await Reservation.create(reservationData);

  await Room.findByIdAndUpdate(newReservation.room, {
    $push: { reservations: newReservation._id },
  });

  return newReservation;
};

const getAllReservations = async (query) => {
  return await Reservation.find(query)
    .populate({
      path: "room",
      select: "number",
    })
    .sort({ checkin: 1 });
};

const getReservationById = async (reservationId) => {
  return await Reservation.findById(reservationId).populate({
    path: "room",
    select: "number",
  });
};

const updateReservation = async (reservationId, updateData) => {
  return await Reservation.findByIdAndUpdate(reservationId, updateData, {
    new: true,
    runValidators: true,
  });
};

const deleteReservation = async (reservationId) => {
  const deletedReservation = await Reservation.findByIdAndDelete(reservationId);

  if (!deletedReservation) {
    throw new Error("Reservation not found");
  }

  await Room.findByIdAndUpdate(deletedReservation.room, {
    $pull: { reservations: reservationId },
  });

  return deletedReservation;
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};
