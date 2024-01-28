const pool = require("../db/pool");

const getCoaches = async (req, res) => {
  let responseData = {};
  try {
    let data = req.body;
    console.log(data);
    const response = await pool.query(
      `SELECT * FROM users WHERE (role = 'coach');`
    );
    console.log("response", response);
    responseData.success = true;
    responseData.data = response.rows.map((i) => ({
      userId: i.user_id,
      username: i.username,
      firstName: i.first_name,
      lastName: i.last_name,
      role: i.role,
      session: i.session,
      detail: i.detail,
      phonenumber: i.phone_number,
      userImg: i.user_image,
    }));
  } catch (error) {
    responseData.success = false;
    console.log(error);
  } finally {
  }
  res.status(200).send(responseData); //success
  return res.end();
};

module.exports = getCoaches;
