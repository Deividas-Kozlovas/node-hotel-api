const reservationService = require("../services/reservationService");

exports.createReservation = async (req, res) => {
  try {
    const newReservation = await reservationService.createReservation(req.body);
    res.status(201).json({ status: "success", data: newReservation });
  } catch (err) {
    res.status(err.statusCode || 400).json({
      status: "fail",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : err.userMessage || "Invalid data. Please check your inputs.",
    });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await reservationService.getAllReservations(req.body);
    res.status(200).json({ status: "success", data: reservations });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      status: "error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Error fetching reservations. Please try again later.",
    });
  }
};

exports.getReservation = async (req, res) => {
  try {
    const reservation = await reservationService.getReservationById(
      req.params.id
    );
    res.status(200).json({ status: "success", data: reservation });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      status: "error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Error fetching reservation. Please try again later.",
    });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const updatedReservation = await reservationService.updateReservation(
      req.params.id,
      req.body
    );
    res.status(200).json({ status: "success", data: updatedReservation });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      status: "error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Error updating reservation, please try again later.",
    });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await reservationService.deleteReservation(
      req.params.id
    );
    res.status(204).json({ status: "success" });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      status: "error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Error deleting reservation, please try again later.",
    });
  }
};
