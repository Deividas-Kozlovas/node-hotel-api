const mongoose = require("mongoose");

function generateReservationCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 10; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

const reservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Guest name is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    zip: {
      type: String,
      required: [true, "ZIP code is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    checkin: {
      type: Date,
      required: [true, "Check-in date is required"],
    },
    checkout: {
      type: Date,
      required: [true, "Check-out date is required"],
    },
    room: {
      type: mongoose.Schema.ObjectId,
      ref: "Room",
      required: [true, "Room is required"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "You must select a user"],
    },
    code: {
      type: String,
      unique: true,
      default: generateReservationCode,
    },
  },
  {
    timestamps: true,
  }
);

reservationSchema.pre("save", async function (next) {
  const existingReservation = await Reservation.findOne({
    room: this.room,
    $or: [
      {
        checkin: { $lt: this.checkout },
        checkout: { $gt: this.checkin },
      },
    ],
  });

  if (existingReservation) {
    return next(
      new Error("This room is already reserved during the selected dates")
    );
  }

  const existingCode = await Reservation.findOne({ code: this.code });
  if (existingCode) {
    this.code = generateReservationCode();
  }

  next();
});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
