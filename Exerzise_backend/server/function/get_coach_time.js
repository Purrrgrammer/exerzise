const pool = require("../db/pool");

const getBookings = async (req, res) => {
  let responseData = {};
  const coachId = req.params.coachId;

  try {
    //get by params
    let input = req.body;
    console.log(input);
    const response = await pool.query(
      `SELECT * FROM coachtime WHERE user_id = $1`,
      [coachId]
    );

    console.log("response", response);
    responseData.success = true;

    responseData.data = response.rows.map((i) => ({
      timeId: i.time_id,
      day: i.day,
      date: i.date,
      price: i.price,
      timeTo: i.time_to,
      timeFrom: i.time_from,
      availableTime: i.available_time,
      endOfAvailableTime: i.endofavailable_time,
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
