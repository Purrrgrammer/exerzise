const express = require("express");

const router = express.Router();
const getCoach = require("../controllers/get_coach");
const getCoachTime = require("../controllers/get_coach_time");
const bookCoachTime = require("../controllers/book_coach_time");
const getCoachSchedule = require("../controllers/get_coach_schedule");
const setCoachSchedule = require("../controllers/set_coach_schedule");
router.route("/:userId").get(getCoach);
router.route("/time/:coachId").get(getCoachTime);
router.route("/:coachId").post(bookCoachTime);

//schedule
// booking get and set
router.route("/schedule/:coachId").post(setCoachSchedule).get(getCoachSchedule);

module.exports = router;
