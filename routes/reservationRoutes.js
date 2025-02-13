const express = require("express");
const reservationController = require("../controllers/reservationController");
const reservationMiddleware = require("../middlewares/reservationMiddleware");

const router = express.Router();

router.param("id", reservationMiddleware.checkReservationID);

router
  .route("/")
  .get(reservationController.getAllReservations)
  .post(
    reservationMiddleware.validateReservation,
    reservationController.createReservation
  );

router
  .route("/:id")
  .get(reservationController.getReservation)
  .patch(reservationController.updateReservation)
  .delete(reservationController.deleteReservation);

module.exports = router;
