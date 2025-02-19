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

// Global error handler middleware (this must be last)
app.use((err, req, res, next) => {
  console.log(err); // Log the entire error object for debugging

  if (err.isOperational) {
    return res.status(err.statusCode || 500).json({
      status: "fail",
      message: err.userMessage || err.message,
    });
  }

  // Log unexpected errors
  console.error(err); // Log the full error details for debugging
  return res.status(500).json({
    status: "error",
    message: "Something went wrong!",
  });
});
module.exports = app;
