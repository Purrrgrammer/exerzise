const pool = require("../db/pool");

const getUser = async (req, res) => {
  let responseData = {};
  try {
    let data = req.body;
    console.log(data);
    const response = await pool.query(`SELECT MAX(userid) FROM users`);
    // const response = await pool.query(`SELECT * FROM USERS where userid = 1`);
    responseData.success = true;
    responseData.data = response;
  } catch (error) {
    responseData.success = false;
    console.log(error);
  } finally {
  }
  res.status(200).send(responseData); //success
  return res.end();
};

module.exports = getUser;
