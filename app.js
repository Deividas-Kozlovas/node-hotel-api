const express = require("express");
const morgan = require("morgan");

const app = express();

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
}

const roomRouter = require("./routes/roomRoutes");
const reservationRouter = require("./routes/reservationRoutes");
app.use(express.json());

app.use("/api/v1/rooms", roomRouter)
app.use("/api/v1/reservations", reservationRouter)

module.exports = app;