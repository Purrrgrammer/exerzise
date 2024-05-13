const express = require("express");
const checkUserAuthPage = require("./middleware/authPage");
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const getUser = require("./controllers/getusers");
const cors = require("cors");
const register = require("./controllers/neutral/register");
const getCoaches = require("./controllers/get_coaches");
const login = require("./controllers/neutral/login");
const getCoach = require("./controllers/get_coach");
const setCoachSchedule = require("./controllers/set_coach_schedule");
const bookCoachTime = require("./controllers/book_coach_time");
const getCoachSchedule = require("./controllers/get_coach_schedule");
const getUserBookings = require("./controllers/get_bookings");
const getCoachTime = require("./controllers/get_coach_time");
const updateStatus = require("./controllers/status_update");
const postComment = require("./controllers/post_comment");
const verifyAuthToken = require("./middleware/auth");
const getUserProfile = require("./controllers/get_user_profile");
const deleteSchedule = require("./controllers/delete_coach_schedule");
const upload = require("./controllers/neutral/upload");
const multer = require("multer");
// middleware => app.use
app.use(cors());
// get data from client side when building fullstack app => why? =>
// access to body to get JSON
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("./server/public"));
app.use(checkUserAuthPage, require("./routes/rootRoutes"));

app.use((req, res, next) => {
  // only we allow or provide
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Method", "GET,POST,PUT,PATCH,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Authorization,TokenAuth,Content-Type,Accept,x-access-token,x-refresh-token,_id"
  ); //everything
  res.header("Access-Control-Expose-Headers", "x-access-token,x-refresh-token");
  next();
});
//for all
// except one route
// token
app.get("/user/all", async (req, res) => {
  getUser(req, res);
});
app.get("/user", async (req, res) => {
  getUserProfile(req, res);
});
//coach only
app.post("/coach/schedule/:coachId", async (req, res) => {
  setCoachSchedule(req, res);
});
//user only
app.post("/coach/:coachId", async (req, res) => {
  bookCoachTime(req, res);
});
app.get("/coach/:userId", async (req, res) => {
  getCoach(req, res); //by ID
});
app.get("/coaches", async (req, res) => {
  getCoaches(req, res);
});
app.get("/coachschedule/:coachId", async (req, res) => {
  getCoachSchedule(req, res);
});

app.get("/schedule/:userId/:allDone", async (req, res) => {
  getUserBookings(req, res);
});
// booking updating
app.put("/schedule/:bookingId", async (req, res) => {
  updateStatus(req, res);
});
app.delete("/schedule/delete/:coachId", async (req, res) => {
  deleteSchedule(req, res);
});
app.get("/coachtime/:coachId", async (req, res) => {
  getCoachTime(req, res);
});
app.put("/comment/:bookingId", async (req, res) => {
  postComment(req, res);
});

//multer for file uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./server/public/images");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${req.params.userId}`);
  },
});

const uploadd = multer({ storage });

app.use("/upload", uploadd.single("file"), require("./routes/uploadRoutes"));
app.use("/login", require("./routes/loginRoute"));
app.use("/register", require("./routes/registerRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));

app.all("*", checkUserAuthPage, (req, res, next) => {
  res.json({ message: "some err occurs" });
});
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
