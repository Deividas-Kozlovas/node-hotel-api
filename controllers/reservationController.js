const reservationService = require("../services/reservationService");

exports.createReservation = async (req, res, next) => {
  try {
    const newReservation = await reservationService.createReservation(req.body);
    res.status(201).json({ status: "success", data: newReservation });
  } catch (err) {
    next(err);
  }
};

exports.getAllReservations = async (req, res, next) => {
  try {
    const reservations = await reservationService.getAllReservations();
    res.status(200).json({ status: "success", data: reservations });
  } catch (err) {
    next(err);
  }
};

exports.getReservation = async (req, res, next) => {
  try {
    const reservation = await reservationService.getReservationById(
      req.params.id
    );
    if (!reservation) {
      const error = new Error("Reservation not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({ status: "success", data: reservation });
  } catch (err) {
    next(err);
  }
};

exports.updateReservation = async (req, res, next) => {
  try {
    const updatedReservation = await reservationService.updateReservation(
      req.params.id,
      req.body
    );
    if (!updatedReservation) {
      const error = new Error("Reservation not found to update");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({ status: "success", data: updatedReservation });
  } catch (err) {
    next(err);
  }
};

exports.deleteReservation = async (req, res, next) => {
  try {
    const deletedReservation = await reservationService.deleteReservation(
      req.params.id
    );
    if (!deletedReservation) {
      const error = new Error("Reservation not found to delete");
      error.statusCode = 404;
      return next(error);
    }
    res.status(204).json({ status: "success" });
  } catch (err) {
    next(err);
  }
};
