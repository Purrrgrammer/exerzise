const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["Autorization"];
  const token = authHeader && authHeader.split("")[1];
  if (token == null) {
    console.log("need authh");
    return res.status(403).send("Token is required");
  }
  try {
    const result = await common.tokenExc.verifyToken(token);
    req._user = result;
  } catch (err) {
    console.log(err);
  }
  next();
};

module.exports = verifyToken;
