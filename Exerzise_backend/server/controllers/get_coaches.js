const pool = require("../db/pool");

const getCoaches = async (req, res) => {
  let responseData = {};
  console.log("user req detail to get coaches", req._user);
  try {
    //     const response = await pool.query(
    //       `SELECT u.username,u.user_id,first_name,last_name,detail,user_image,u.phone_number ,u.session, coalesce(sum(b.rating)/count(b.rating)) as average_rating,count(b.rating) as done_count
    // FROM users u left join bookings b on u.user_id = b.coach_id WHERE (role = 'coach')
    // group by u.user_id`
    //     );
    const response = await pool.query(
      `SELECT u.username,u.user_id,u.first_name, u.last_name,u.detail,u.user_image,u.phone_number,u.session,
COALESCE(SUM(CAST(b.rating AS NUMERIC)) / NULLIF(COUNT(b.rating), 0), 0) AS average_rating,COUNT(b.rating) AS done_count
FROM users u LEFT JOIN bookings b ON u.user_id = b.coach_id WHERE u.role = 'coach'GROUP BY u.user_id, u.username, u.first_name, u.last_name, u.detail, u.user_image, u.phone_number, u.session;`
    );
    // console.log("response", response);
    responseData.success = true;
    responseData.data = response.rows.map((i) => ({
      userId: i.user_id,
      username: i.username,
      firstname: i.first_name,
      lastname: i.last_name,
      role: i.role,
      session: i.session,
      detail: i.detail,
      phonenumber: i.phone_number,
      userImage: `http://localhost:5000/images/${i.user_image}`,
      rating: i.rating,
      ratingCount: i.done_count,
      averageRating: parseInt(i.average_rating),
    }));
    res.status(200).json(responseData); //success
  } catch (error) {
    responseData.success = false;
    responseData.message = "fetchingerr";
    console.log("error", error);
    res.status(400).json(responseData); //success
  } finally {
  }
  return res.end();
};

module.exports = getCoaches;
