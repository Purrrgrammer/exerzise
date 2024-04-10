const common = require("../common/common");

const verifyAuthToken = async (req, res, next) => {
  // console.log("req.headers", req.headers);
  const authHeader = req.headers["authorization"];
  // console.log("authHeader", authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(403).send("Token is required || Need Auth");
  }
  try {
    const userAuthResult = await common.tokenExc.verifyToken(token);
    if (userAuthResult.isSuccess === false) {
      return res.status(403).send(userAuthResult.message);
    }
    req._user = userAuthResult;
  } catch (err) {
    console.log("error", err);
  }
  next();
};

module.exports = verifyAuthToken;
