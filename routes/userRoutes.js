const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userMiddleware = require("../middlewares/userMiddleware");

// router.get("/verify-token", userMiddleware.protect, (req, res) => {
//   res.status(200).json({
//     status: "Success",
//     user: req.user,
//   });
// });
router.post("/signup", userMiddleware.validateUser, authController.signup);
router.post("/login", authController.login);

module.exports = router;
