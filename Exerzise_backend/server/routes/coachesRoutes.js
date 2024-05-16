const express = require("express");

const router = express.Router();
const getCoaches = require("../controllers/get_coaches");
router.route("/").get(getCoaches);
module.exports = router;
