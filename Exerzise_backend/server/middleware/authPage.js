const verifyAuthToken = require("../middleware/auth.js");

const checkUserAuthPage = (req, res, next) => {
  const nonSecurePaths = ["/", "/user/all", "/login", "/register"];
  // console.log(req.path);
  if (nonSecurePaths.includes(req.path)) {
    console.log("this path requires no auth");
    return next();
  }
  console.log("stuck with auth");
  // must auth
  verifyAuthToken(req, res, next);
};

module.exports = checkUserAuthPage;
