// getCoachSchedule
const pool = require("../db/pool");
// helper function
function generateTimeIntervals(timeRanges, typeTime) {
  let result = [];
  // console.log("timeRanges", timeRanges);
  timeRanges.forEach((range) => {
    let startTime = parseTime(range.start);
    let endTime = parseTime(range.end);
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
  let input = req.body;
  console.log(input);

  // console.log(`userId`, req.params.userId);
  // console.log(`dayQuery`, dayQuery);
  // console.log(`dateQuery`, dateQuery);

  const param = [req.params.userId, dayQuery, dateQuery];
  // console.log(`param`, param);
  try {
    const response = await pool.query(
      `SELECT * FROM coachtime WHERE user_id = $1 AND day=$2`,
      [param[0], param[1]]
    );
    responseData.success = true;
    // console.log(`response `, response.rows[0]);
    responseData.data = response.rows.map((i) => ({
      timeId: i.time_id,
      date: i.date,
      day: i.day,
      start: i.available_time,
      end: i.endofavailable_time,
      price: i.price,
      userId: i.user_id,
    }));

    // console.log("response", response);
    // console.log("param[1]", param[1]);
    let generatedIntervals = generateTimeIntervals(responseData.data, timeType); // 30 or 60;
    // console.log("all coach generatedIntervals", generatedIntervals);
    // console.log("param1", param[1]);
    const bookedresponse = (
      await pool.query(`SELECT * FROM bookings WHERE date = $1`, [param[2]])
    ).rows;
    // // create all free is time and filter by booking Time
    // console.log("booked responses", bookedresponse);
    let availableIntervals = removeBookingTimes(
      generatedIntervals,
      bookedresponse
    );
    // console.log("availableIntervals", availableIntervals);
    // console.log(`generateTimeIntervals`, generatedIntervals);

    // RESPONSES
    responseData.data = response.rows;
    responseData.bookedresponse = bookedresponse;
    responseData.availableTime = availableIntervals ? availableIntervals : [];
  } catch (error) {
    responseData.success = false;
    console.log(`error`, error);
  } finally {
  }
  res.status(200).send(responseData); //success
  return res.end();
};

module.exports = getCoachSchedule;
