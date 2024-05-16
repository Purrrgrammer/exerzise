const pool = require("../../db/pool");

const getUser = async (req, res) => {
  //not valid
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
  res.status(200).json(responseData); //success
  return res.end();
};

const getUserProfile = async (req, res) => {
  let responseData = {};
  const user = req._user; //user from jwtauth
  try {
    const response = await pool.query(
      `SELECT * FROM users where user_id = '${user.userId}'`
    );
    const result = response.rows.map((i) => ({
      username: i.username,
      userId: i.user_id,
      firstname: i.first_name,
      lastname: i.last_name,
      role: i.role,
      userImage: `http://localhost:5000/images/${i.user_image}`,
      detail: i.detail,
      phonenumber: i.phone_number,
    }))[0];

    responseData.success = true;
    responseData.data = result;
    res.status(200).json(responseData); //success
  } catch (error) {
    console.log(error);
    responseData.success = true;
    responseData.message = "Something Wrong";
    res.status(403).json(responseData); //success
  } finally {
  }
  return res.end();
};

module.exports = { getUser, getUserProfile };
