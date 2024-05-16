const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "../../server/public/images");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${req.params.userId}`);
  },
});
const uploadd = multer({ storage });

const upload = require("../controllers/public/upload");

router.route("/:userId").post(upload);

module.exports = router;
