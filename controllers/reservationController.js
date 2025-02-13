const Reservation = require("../models/reservationModel");

exports.createReservation = async (req, res) => {
  try {
    const newReservation = await Reservation.create(req.body);
    res.status(201).json({
      status: "success",
      data: newReservation,
    });
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
    const reservations = await Reservation.find();
    res.status(200).json({
      status: "success",
      results: reservations.length,
      data: { reservations },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Error fetching reservations",
    });
  }
};

exports.getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({
        status: "fail",
        message: "No reservation with this ID was found",
      });
    }

    res.status(200).json({
      status: "success",
      data: { reservation },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Error fetching the reservation",
    });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(
      req.params.id
    ); // ✅ Fixed req.body → req.params
    if (!deletedReservation) {
      return res.status(404).json({
        status: "fail",
        message: "No reservation found to delete",
      });
    }

    res.status(204).json({});
  } catch (err) {
    res.status(500).json({
      status: "error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Error deleting reservation, please try later",
    });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({
        status: "fail",
        message: "No reservation found to update",
      });
    }

    res.status(200).json({
      status: "success",
      data: { updatedReservation },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Error updating reservation, please try later",
    });
  }
};
