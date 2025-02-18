const express = require("express");
const roomController = require("../controllers/roomController");
const roomMiddleware = require("../middlewares/roomMiddleware");
const userMiddleware = require("../middlewares/userMiddleware");

const router = express.Router();

router.param("id", roomMiddleware.checkRoomID);

router
  .route("/")
  .get(roomController.getAllRooms)
  .post(roomMiddleware.validateRoom, roomController.createRoom);

router
  .route("/:id")
  .get(roomController.getRoom)
  .patch(roomController.updateRoom)
  .delete(roomController.deleteRoom);

router.get(
  "/availability/checkin/:checkinDate/checkout/:checkoutDate",
  roomController.getAvailableRooms
);

module.exports = router;
