const express = require("express");
const router = express.Router();
const register = require("../controllers/public/register");

router.route("/").post(register);

module.exports = router;
