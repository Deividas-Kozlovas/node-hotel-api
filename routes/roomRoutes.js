const express = require("express");
const roomController = require("../controllers/roomController");
const roomMiddleware = require("../middlewares/roomMiddleware");

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
    .delete(roomController.deleteRoom)

module.exports = router;