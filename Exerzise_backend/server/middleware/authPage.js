const verifyAuthToken = require("../middleware/auth.js");

const checkUserAuthPage = (req, res, next) => {
  const nonSecurePaths = ["/", "/user/all", "/login", "/register"];
  if (nonSecurePaths.includes(req.path)) {
    return next();
  }
  // must auth
  verifyAuthToken(req, res, next);
};

module.exports = checkUserAuthPage;
