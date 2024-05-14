const express = require("express");
const router = express.Router();
const { getUserProfile } = require("../controllers/neutral/userController");
const getUserBookings = require("../controllers/get_bookings");
router.route("/").get(getUserProfile);
// for bookings history
router.route("/schedule/:userId/:allDone").get(getUserBookings);
module.exports = router;
