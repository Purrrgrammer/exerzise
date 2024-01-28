require("dotenv").config();

var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cryptPassword = async (password) => {
  const salt = bcrypt.genSaltSync(10);
  try {
    const result = bcrypt.hash(password, salt);
    console.log("input password", password);
    console.log("hash result", result);
    return result;
  } catch (err) {
    console.log(err);
  }
};

const decryptPassword = async (pliainPassword, hash) => {
  try {
    const result = bcrypt.compare(pliainPassword, hash);
    console.log("password from DB", pliainPassword);
    console.log("dehash result", result);
    return result;
  } catch (err) {
    console.log(err);
  }
};

const generateToken = async (userId) => {
  try {
    const token = jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    return token;
  } catch (err) {
    console.log(err);
  }
};

const verifyToken = async (token) => {
  try {
    const decodeToken = jwt.verify(
      userId,
      process.env.ACCESS_TOKEN_SECRET,
      (err, user) => {
        if (err) {
          return res.status(403).send(`User ${user} dont have access`);
        }
        console.log(decodeToken);
        return decodeToken;
      }
    );
    return decodeToken;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  passwordExc: { cryptPassword, decryptPassword },
  tokenExc: { generateToken, verifyToken },
};
