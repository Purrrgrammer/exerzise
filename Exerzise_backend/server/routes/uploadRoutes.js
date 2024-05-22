const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = require("../controllers/public/upload");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./server/public/images");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${req.params.userId}`);
  },
});
const uploadd = multer({ storage });
router.post("/:userId", uploadd.single("file"), upload);

module.exports = router;
