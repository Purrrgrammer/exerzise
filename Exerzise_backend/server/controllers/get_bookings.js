const pool = require("../db/pool");
const common = require("../common/common");

const getUserBookings = async (req, res) => {
  let responseData = {};
  const userId = req.params.userId;
  console.log(`param userId?`, userId);
  const allDone = req.params.allDone;
  console.log(`param allDone?`, allDone);
  try {
    //get by params
    const doneResponse = await pool.query(
      `SELECT * FROM bookings LEFT JOIN 
      users on bookings.coach_id = users.user_id WHERE (bookings.user_id = $1 or bookings.coach_id = $1) and (coach_status = 'done' and user_status = 'done')`,
      [userId]
    );
    const response = await pool.query(
      `SELECT * FROM bookings LEFT JOIN
      users on bookings.coach_id = users.user_id WHERE (bookings.user_id = $1 or bookings.coach_id = $1) and (NOT coach_status = 'done' or NOT user_status = 'done') `,
      [userId]
    );
    //
    responseData.success = true;
    responseData.data = (
      /true/.test(allDone) === true ? doneResponse : response
    ).rows.map((i) => ({
      bookingId: i.booking_id,
      date: i.date,
      day: i.day,
      price: parseInt(i.price),
      timeFrom: i.time_from,
      timeTo: i.time_to,
      session: i.session, //joinable
      typeTime: i.type_time,
      userStatus: i.user_status,
      coachStatus: i.coach_status,
      rating: parseInt(i.rating),
      comment: i.comment,
      payment: i.payment,
      // from joined table data to user
      coachId: i.coach_id,
      coachPhoneNumber: i.phone_number, //joinable
      coachFirstName: i.first_name, //joinable
      coachLastName: i.last_name, //joinable
      coachImage: `http://localhost:5000/images/${i.user_image}`, //joinable
      userImage: `http://localhost:5000/images/${i.coach_image}`, //joinable
      // from joined table data to coach
      userId: userId,
      userphonenumber: i.user_phonenumber,
      // userfirstname
      // userlastname
    }));
    res.status(200).send(responseData); //success
  } catch (error) {
    responseData.success = false;
    responseData.message = "something wrong on get schedule";
    console.log(error);
    res.status(500).send(responseData); //success
  } finally {
  }
  return res.end();
};

module.exports = getUserBookings;
