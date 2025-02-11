const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  number: {
    type: String,
    required: [true, "Room number is required"],
  },
  capacity: {
    type: Number,
    default: 1,
    min: [1, "Capacity must be at least 1"],
    max: [10, "Highest capacity is 10"],
  },
  floor: {
    type: Number,
    default: 1, 
    min: [1, "Lowest floor is 1"],
    max: [4, "Highest floor is 4"],
  },
  room_image: {
    type: String,
    required: [true, "A hotel room must have an image"],
  },
  pricing: {
    type: Number,
    required: [true, "Room must have a price"],
    min: [1, "Price cannot be negative"],
  },
  wifi: {
    type: Boolean,
    required: [true, "Specify if the room has WiFi"],
  },
  parking: {
    type: Boolean,
    required: [true, "Specify if the room has parking"], 
  },
  breakfast: {
    type: Boolean,
    required: [true, "Specify if the room includes breakfast"], 
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
