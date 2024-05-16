// getCoachSchedule
const pool = require("../db/pool");
// helper function
function generateTimeIntervals(timeRanges, typeTime) {
  let result = [];

  timeRanges.forEach((range) => {
    let startTime = parseTime(range.start);
    let endTime = parseTime(range.end);
    while (startTime < endTime) {
      result.push(formatTime(startTime));
      startTime = new Date(startTime.getTime() + typeTime * 60000); // add typeTime minutes
    }
  });
  return result;
}

function removeBookingTimes(timeIntervals, bookingTime) {
  let bookingTimes = [];

  bookingTime.forEach((booking) => {
    let startTime = parseTime(booking.start);
    let endTime = new Date(startTime.getTime() + booking.typeTime * 60000);

    while (startTime < endTime) {
      bookingTimes.push(formatTime(startTime));
      startTime = new Date(startTime.getTime() + 30 * 60000); // Use 30 minutes interval to cover overlaps
    }
  });

  return timeIntervals.filter((time) => !bookingTimes.includes(time));
}

// Helper functions
function parseTime(timeStr) {
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

const getCoachScheduleV2 = async (req, res) => {
  let responseData = {};
  const timeType = req.query.time;
  const dayQuery = req.query.day;
  // const dateQuery = req.query.date;
  console.log(`timeType`, timeType);
  console.log(`dateQuery`, dayQuery);

  const param = [req.params.userId, req.query.date, dayQuery];
  // const param = [req.params.userId, req.params.date];
  console.log(`param`, param);
  try {
    //get by params
    let input = req.body;
    console.log(input);

    const response = await pool.query(
      `SELECT * FROM coachtime WHERE user_id = $1`,
      param[0]
    );
    responseData.success = true;

    responseData.data = response.rows.map((i) => ({
      timeId: i.time_id,
      date: i.date,
      day: i.day,
      start: i.available_time,
      end: i.endofavailable_time,
      price: i.price,
      userId: i.user_id,
      // avaiableTime: generateTimeIntervals(i, timeType),
    }));

    console.log("response", response);

    // let generatedIntervals = generateTimeIntervals(responseData.data, timeType); // 30 or 60;
    // console.log(`generateTimeIntervals`, generatedIntervals);
    // responseData.avaiableTime = generatedIntervals;
    //   .filter((el) => el.userId === param);
  } catch (error) {
    responseData.success = false;
    console.log(error);
  } finally {
  }
  res.status(200).send(responseData); //success
  return res.end();
};

module.exports = getCoachScheduleV2;
