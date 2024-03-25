const express = require("express");
const app = express();
const PORT = 5000;
const getUser = require("./function/getusers");
const register = require("./function/register");
const getCoaches = require("./function/get_coaches");
const login = require("./function/login");
const bodyParser = require("body-parser");
const auth = require("./middleware/auth");
const getCoach = require("./function/get_coach");
const setCoachTime = require("./function/coach_schedule");
const bookCoachTime = require("./function/book_coach_time");
const getCoachSchedule = require("./function/get_coach_schedule");
const getBookings = require("./function/get_bookings");
const getCoachTime = require("./function/get_coach_time");
const updateStatus = require("./function/status_update");
const postComment = require("./function/post_comment");
const cors = require("cors");

// middleware => app.use
app.use(cors());
// get data from client side when building fullstack app => why? =>
// access to body to get JSON
app.use(express.json());
app.use(bodyParser.json());

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

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
//for all
app.post("/register", async (req, res) => {
  register(req, res);
});

app.post("/login", async (req, res) => {
  login(req, res);
});
app.get("/user/all", async (req, res) => {
  getUser(req, res);
});
//coach only
app.post("/coach/schedule/:coachId", async (req, res) => {
  setCoachTime(req, res);
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
app.get("/coachschedule/:userId", async (req, res) => {
  getCoachSchedule(req, res);
});
app.get("/schedule/:userId", async (req, res) => {
  getBookings(req, res);
});
// booking updating
app.put("/schedule/:bookingId", async (req, res) => {
  updateStatus(req, res);
});

app.get("/coachtime/:coachId", async (req, res) => {
  getCoachTime(req, res);
});
app.get("/comment/:bookingId", async (req, res) => {
  postComment(req, res);
});
