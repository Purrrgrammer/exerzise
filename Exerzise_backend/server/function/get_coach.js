const pool = require("../db/pool");

const getCoach = async (req, res) => {
  let responseData = {};

  const param = req.params.userId;
  console.log(`param`, param);
  try {
    //get by params
    let input = req.body;
    console.log(input);

    const response = await pool.query(
      `SELECT * FROM users WHERE user_id = $1`,
      [param]
    );

    console.log("response", response);
    responseData.success = true;

    responseData.data = response.rows
      .map((i) => ({
        userId: i.user_id,
        username: i.username,
        firstName: i.first_name,
        lastName: i.last_name,
        role: i.role,
        session: i.session,
        detail: i.detail,
        phonenumber: i.phone_number,
        userImg: i.user_image,
      }))
      .filter((el) => el.userId === param);
  } catch (error) {
    responseData.success = false;
    console.log(error);
  } finally {
  }
  res.status(200).send(responseData); //success
  return res.end();
};

module.exports = getCoach;
