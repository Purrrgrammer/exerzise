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

const generateToken = async (userData) => {
  try {
    const token = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });
    return token;
  } catch (err) {
    console.log(err);
  }
};

const verifyToken = async (token) => {
  try {
    // console.log("token from verify", token);
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, user) => {
        // console.log("verify err=>", err);
        if (err) {
          return {
            isSuccess: false,
            message: `user do not have access`,
          };
          // return res.status(403).send(`User ${user} dont have access`);
        }
        // console.log("success: user from jwt", user);
        return user;
      }
    );
    return decodedToken; //user from decoded
  } catch (err) {
    console.log(err);
  }
};

const removeObjectValueDupe = (arr, key) => {
  // key
  return [...new Map(arr.map((item) => [item[key], item])).values()];
};
module.exports = {
  passwordExc: { cryptPassword, decryptPassword },
  tokenExc: { generateToken, verifyToken },
  otherExc: { removeObjectValueDupe },
};
