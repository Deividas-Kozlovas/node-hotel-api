const reservationService = require("../services/reservationService");

exports.createReservation = async (req, res) => {
  try {
    const newReservation = await reservationService.createReservation(req.body);
    res.status(201).json({ status: "success", data: newReservation });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Invalid data. Please check inputs.",
    });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await reservationService.getAllReservations(req.body);
    res.status(200).json({ status: "success", reservations });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "No reservations found matching the criteria.",
    });
  }
};

exports.getReservation = async (req, res) => {
  try {
    const reservation = await reservationService.getReservationById(
      req.params.id
    );
    res.status(200).json({ status: "success", data: { reservation } });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "No reservation found with this ID.",
    });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const updatedReservation = await reservationService.updateReservation(
      req.params.id,
      req.body
    );
    res.status(200).json({ status: "success", data: { updatedReservation } });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Error updating reservation, please try later.",
    });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    await reservationService.deleteReservation(req.params.id);
    res.status(204).json({ status: "success" });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Error deleting reservation, please try later.",
    });
  }
};
