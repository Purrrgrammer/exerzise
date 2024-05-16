const express = require("express");
const updateStatus = require("../controllers/status_update");
const deleteSchedule = require("../controllers/delete_coach_schedule");
const router = express.Router();

router.route("/:bookingId").put(updateStatus);
router.route("/delete/:coachId").delete(deleteSchedule);

module.exports = router;

// app.put("/schedule/:bookingId", async (req, res) => {
//   updateStatus(req, res);
// });
// app.delete("/schedule/delete/:coachId", async (req, res) => {
//   deleteSchedule(req, res);
// });
