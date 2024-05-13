const common = require("../common/common");
const pool = require("../db/pool");

const getUserProfile = async (req, res) => {
  let responseData = {};
  const user = req._user;
  console.log(`initiate user`);
  
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
    return res.status(200).send(responseData); //success
  } catch (error) {
    console.log(error);
    responseData.success = true;
    responseData.message = "Something Wrong";
    res.status(403).send(responseData); //success
  } finally {
  }
  return res.end();
};

module.exports = getUserProfile;
