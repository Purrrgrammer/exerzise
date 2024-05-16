const express = require("express");
const router = express.Router();
const postComment = require("../controllers/post_comment");

router.route("/:bookingId").put(postComment);

module.exports = router;
