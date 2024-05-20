const pool = require("../db/pool");

const getCoach = async (req, res) => {
  let responseData = {};
  const { userId } = req.params;
  // console.log(`param`, userId);
  try {
    let input = req.body;
    console.log(input);
    const response = await pool.query(
      `SELECT username,u.user_id,first_name,last_name,detail,user_image,u.phone_number ,u.session,coalesce(sum(b.rating)/count(b.rating)) as average_rating,count(b.rating) as done_count 
FROM users u left join bookings b on u.user_id = b.coach_id WHERE u.user_id = $1 group by u.user_id `,
      [userId]
    );
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
        userImage: `http://localhost:5000/images/${i.user_image}`,
        // rating: i.rating,
        ratingCount: i.rating_count,
        averageRating: parseInt(i.average_rating),
        ratingCount: i.done_count,
        price: i.price,
      }))
      .filter((el) => el.userId === userId); //array
    res.status(200).json(responseData); //success
  } catch (error) {
    responseData.messsage = "something wrong";
    responseData.success = false;
    console.log(error);
    res.status(500).json(responseData); //success
  } finally {
  }
  return res.end();
};

module.exports = getCoach;
