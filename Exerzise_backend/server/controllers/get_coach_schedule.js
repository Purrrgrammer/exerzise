// getCoachSchedule
const pool = require("../db/pool");
// helper function
function generateTimeIntervals(timeRanges, typeTime) {
  let result = [];
  // console.log("timeRanges", timeRanges);
  timeRanges.forEach((range) => {
    let startTime = parseTime(range.availableTime);
    let endTime = parseTime(range.endOfAvailableTime);
    while (startTime < endTime) {
      result.push(formatTime(startTime));
      startTime = new Date(startTime.getTime() + typeTime * 60000); // add typeTime minutes
    }
  });
  // console.log("all coach time schedule", result);
  return result;
}
function removeBookingTimes(timeIntervals, bookingTime) {
  let bookedTimes = [];
  bookingTime.forEach((booking) => {
    // console.log("type time", booking.typetime);
    console.log("booking", booking);
    let startTime = parseTime(booking.time_from);
    // console.log("get start time", startTime.getTime());
    // console.log("startTime", startTime);
    let endTime = new Date(startTime.getTime() + booking.typetime * 60000);
    // console.log("endTime", endTime);
    while (startTime < endTime) {
      bookedTimes.push(formatTime(startTime));
      startTime = new Date(startTime.getTime() + 30 * 60000); // Use 30 minutes interval to cover overlaps
    }
  });

  return timeIntervals.filter((time) => !bookedTimes.includes(time));
}
// Helper functions
function parseTime(timeStr) {
  // console.log("timeStr", timeStr);
  let [hours, minutes] = timeStr.split(":").map(Number);
  let date = new Date();
  date.setHours(hours, minutes, 0, 0); // set hours and minutes, reset seconds and milliseconds
  return date;
}
function formatTime(date) {
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
// // create all free time by 30 minutes
// let generatedIntervals = generateTimeIntervals(timeRanges, 30); // 30 or 60;
// console.log("generatedIntervals", generatedIntervals);

// // create all free is time and filter by booking Time
// let availableIntervals = removeBookingTimes(generatedIntervals, bookingTime);
// console.log("availableIntervals", availableIntervals);

const getCoachSchedule = async (req, res) => {
  let responseData = {};
  const timeType = req.query.time;
  const dateQuery = req.query.date;
  const dayQuery = new Date(dateQuery).getDay();
  // let input = req.body;
  // console.log(input);
  // console.log(`coachId`, req.params.coachId);
  // console.log(`dayQuery`, dayQuery);
  // console.log(`dateQuery`, dateQuery);
  const param = [req.params.coachId, dayQuery, dateQuery];
  // console.log(`param`, param);
  try {
    const response = await pool.query(
      // `SELECT * FROM coachtime c join users u on u.user_id = c.user_id WHERE (u.user_id = $1 and day = $2)`
      `SELECT * FROM users u left JOIN coachtime c on u.user_id = c.user_id and c.day = $2 where u.user_id = $1`,
      [param[0], param[1]]
    );
    // console.log(`response `, response.rows[0]);
    responseData.data = response.rows.map((i) => ({
      userId: i.user_id,
      username: i.username,
      firstname: i.first_name,
      lastname: i.last_name,
      role: i.role,
      session: i.session,
      detail: i.detail,
      phonenumber: i.phone_number,
      userImage: i.user_image,
      ratingCount: i.rating_count,
      averageRating: parseInt(i.average_rating),
      ratingCount: i.done_count,
      //
    }));
    responseData.timeData = response.rows.map((i) => ({
      timeId: i.time_id,
      coachId: i.user_id,
      date: i.date,
      day: i.day,
      availableTime: i.available_time,
      endOfAvailableTime: i.endofavailable_time,
      price: i.price,
    }));
    // console.log("responseData.timeData", responseData.timeData);
    // console.log("response", response);
    // console.log("param[1]", param[1]);
    if (responseData.timeData[0].availableTime !== null) {
      let generatedIntervals = generateTimeIntervals(
        responseData.timeData,
        timeType
      ); // 30 or 60;
      // console.log("all coach generatedIntervals", generatedIntervals);
      // console.log("param1", param[1]);
      const bookedresponse = (
        await pool.query(`SELECT * FROM bookings WHERE date = $1`, [param[2]])
      ).rows;
      let availableIntervals = removeBookingTimes(
        generatedIntervals,
        bookedresponse
      );
      // // create all free is time and filter by booking Time
      // console.log("booked responses", bookedresponse);
      console.log("availableIntervals", availableIntervals);
      console.log(`generateTimeIntervals`, generatedIntervals);
      responseData.availableTime = availableIntervals ? availableIntervals : [];
    } else {
      responseData.availableTime = [];
    }
    // RESPONSES
    // responseData.bookedresponse = bookedresponse;
    responseData.message = "successfully fetched";
    res.status(200).send(responseData); //success
  } catch (error) {
    responseData.messsage = "something wrong";
    responseData.success = false;
    res.status(500).send(responseData); //success
    console.log(error);
  } finally {
  }
  res.end();
};
module.exports = getCoachSchedule;
