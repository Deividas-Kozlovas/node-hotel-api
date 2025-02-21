const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const roomRouter = require("./routes/roomRoutes");
const reservationRouter = require("./routes/reservationRoutes");
const userRouter = require("./routes/userRoutes");

app.use(express.json());

app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/reservations", reservationRouter);
app.use("/api/v1/user", userRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Something went wrong!",
  });
});

module.exports = app;
