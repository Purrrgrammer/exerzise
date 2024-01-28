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
// middleware => app.use
// app.use(cors());
// get data from client side when building fullstack app => why? =>
// access to body to get JSON
app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
  // only we allow or provide
  res.setHeader("Access-Control-Allow-Origin", "*");
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

app.post("/register", async (req, res) => {
  register(req, res);
});

app.post("/login", async (req, res) => {
  login(req, res);
});

app.post("/coach/schedule", auth, async (req, res) => {
  login(req, res);
});

app.get("/user/all", async (req, res) => {
  getUser(req, res);
});
app.get("/coach/:userId", async (req, res) => {
  getCoach(req, res);
});
app.get("/coaches", async (req, res) => {
  getCoaches(req, res);
});
