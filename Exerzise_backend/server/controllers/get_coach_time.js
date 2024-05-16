const pool = require("../db/pool");

const getCoachTime = async (req, res) => {
  let responseData = {};
  const { coachId } = req.params;
  let input = req.body;
  console.log(input);
  try {
    const response = await pool.query(
      `SELECT * FROM coachtime WHERE user_id = $1`,
      [coachId]
    );
    // console.log("response", response);
    responseData.success = true;
    responseData.data = response.rows.map((i) => ({
      timeId: i.time_id,
      day: i.day,
      date: i.date,
      price: i.price,
      availableTime: i.available_time,
      endOfAvailableTime: i.endofavailable_time,
    }));
    responseData.message = `Coach ${coachId}'s schedule successfully fetched`;
    res.status(200).send(responseData); //success
  } catch (error) {
    responseData.success = false;
    console.log(error);
    res.status(500).send(responseData); //success
  } finally {
  }
  return res.end();
};

module.exports = getCoachTime;
