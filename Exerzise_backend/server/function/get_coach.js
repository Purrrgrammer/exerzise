const pool = require("../db/pool");

const getCoach = async (req, res) => {
  let responseData = {};
  const param = req.params.userId;
  console.log(`param`, param);
  try {
    let input = req.body;
    console.log(input);
    const response = await pool.query(
      `SELECT username,u.user_id,first_name,last_name,detail,user_image,u.phone_number ,u.session,coalesce(sum(b.rating)/count(b.rating)) as average_rating,count(b.rating) as done_count 
FROM users u left join bookings b on u.user_id = b.coach_id WHERE u.user_id = $1 group by u.user_id `,
      [param]
    );

    console.log("response", response);
    responseData.success = true;
    responseData.data = response.rows
      .map((i) => ({
        userId: i.user_id,
        username: i.username,
        firstname: i.first_name,
        lastname: i.last_name,
        role: i.role,
        session: i.session,
        detail: i.detail,
        phonenumber: i.phone_number,
        userImage: i.user_image,
        rating: i.rating,
        ratingCount: i.rating_count,
        averageRating: i.average_rating,
        ratingCount: i.done_count,
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
