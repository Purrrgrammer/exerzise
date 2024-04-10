const pool = require("../db/pool");
const common = require("../common/common");

const getBookings = async (req, res) => {
  let responseData = {};
  const userId = req.params.userId;
  console.log(`param userId?`, userId);
  const allDone = req.params.allDone;
  console.log(`param allDone?`, allDone);
  try {
    //get by params
    const doneResponse = await pool.query(
      `SELECT * FROM bookings LEFT JOIN 
      users on bookings.coach_id = users.user_id WHERE bookings.user_id = $1 and (coach_status = 'done' and user_status = 'done')`,
      [userId]
    );
    const response = await pool.query(
      `SELECT * FROM bookings LEFT JOIN 
      users on bookings.coach_id = users.user_id WHERE bookings.user_id = $1 and (NOT coach_status = 'done' or NOT user_status = 'done') `,
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
      timeTo: i.time_to,
      timeFrom: i.time_from,
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
      coachImage: i.user_image, //joinable
      // from joined table data to coach
      userId: userId,
      // userphonenumber
      // userfirstname
      // userlastname
    }));
  } catch (error) {
    responseData.success = false;
    console.log(error);
  } finally {
  }
  res.status(200).send(responseData); //success
  return res.end();
};

module.exports = getBookings;
