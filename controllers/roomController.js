const multer = require("multer");
const path = require("path");
const roomService = require("../services/roomService");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    if (
      fileExtension !== ".jpg" &&
      fileExtension !== ".jpeg" &&
      fileExtension !== ".png"
    ) {
      return cb(new Error("Only image files are allowed."));
    }
    cb(null, true);
  },
});

const createRoom = async (req, res, next) => {
  console.log(req.body);
  try {
    upload.single("room_image")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ status: "error", message: err.message });
      }

      const roomData = req.body;

      if (req.file) {
        roomData.room_image = req.file.path;
      } else {
        return res
          .status(400)
          .json({ status: "error", message: "Room image is required." });
      }

      const newRoom = await roomService.createRoom(roomData);
      res.status(201).json({ status: "success", data: newRoom });
    });
  } catch (err) {
    next(err);
  }
};

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.status(200).json({ status: "success", data: rooms });
  } catch (err) {
    next(err);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const room = await roomService.getRoomById(req.params.id);
    res.status(200).json({ status: "success", data: room });
  } catch (err) {
    next(err);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await roomService.updateRoom(req.params.id, req.body);
    res.status(200).json({ status: "success", data: updatedRoom });
  } catch (err) {
    next(err);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    await roomService.deleteRoom(req.params.id);
    res.status(204).json({ status: "success" });
  } catch (err) {
    next(err);
  }
};

const getAvailableRooms = async (req, res, next) => {
  try {
    const { checkinDate, checkoutDate } = req.params;
    const availableRooms = await roomService.checkRoomAvailability(
      checkinDate,
      checkoutDate
    );
    res.status(200).json({ status: "success", data: availableRooms });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  getAvailableRooms,
};
