const express = require("express");
const router = express.Router();
const login = require("../controllers/neutral/login");

router.route("/:userId").post(login);

module.exports = router;
