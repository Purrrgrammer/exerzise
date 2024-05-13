const express = require("express");
const router = express.Router();
const register = require("../controllers/neutral/register");

router.route("/").post(register);

module.exports = router;
