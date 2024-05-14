const express = require("express");
const updateStatus = require("../controllers/status_update");
const deleteSchedule = require("../controllers/delete_coach_schedule");
const router = express.Router();

router.route("delete/:bookingId").put(updateStatus);
router.route("/:bookingId").delete(deleteSchedule);

module.exports = router;

// app.put("/schedule/:bookingId", async (req, res) => {
//   updateStatus(req, res);
// });
// app.delete("/schedule/delete/:coachId", async (req, res) => {
//   deleteSchedule(req, res);
// });
