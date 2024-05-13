const express = require("express");
const router = express.Router();
const rootController = require("../controllers/neutral/rootController");

router.route("/").get(rootController);

module.exports = router;
