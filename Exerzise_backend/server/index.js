const express = require("express");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const logger = require("./middleware/logger/reqLogger");
const checkUserAuthPage = require("./middleware/authPage");
const bodyParser = require("body-parser");

// middleware => app.use
app.use(cors());
// get data from client side when building fullstack app => why? =>
// access to body to get JSON
app.use(bodyParser.json());
app.use(express.json());
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

app.use(logger);

app.use("/register", require("./routes/registerRoutes"));
app.use("/login", require("./routes/loginRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/coach", require("./routes/coachRoutes"));
app.use("/schedule", require("./routes/scheduleRoutes"));
app.use("/coaches", require("./routes/coachesRoutes"));
app.use("/comment", require("./routes/commentRoutes"));

app.all("*", (req, res) => {
  res.json({ message: "some err occurs" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
