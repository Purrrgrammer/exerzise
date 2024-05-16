const pool = require("../db/pool");

const updateStatus = async (req, res) => {
  console.log(`updating status`);
  let responseData = {};
  let input = req.body;
  let bookingId = req.params.bookingId;
  const { role } = req.query;
  console.log(`bookingId`, bookingId);
  console.log("input status", input.status);
  try {
    const coach = false;
    let sql = `UPDATE bookings SET ${
      role === "user" ? "user_status" : "coach_status"
    }
    = '${input.status}' WHERE booking_id = $1`;
    const response = await pool.query(sql, [bookingId]);
    // console.log("response", response);
    responseData.message = `set bookingid ${bookingId} status as ${input.status}, completed!`;
  } catch (error) {
    responseData.success = false;
    console.log(error);
  } finally {
  }

  if (responseData) {
    res.status(200).send(responseData); //success
  } else {
    res.status(409).send({ message: "unsuccessfully update" });
  }
};

module.exports = updateStatus;
