const pool = require("../db/pool");
const common = require("../common/common");

const deleteSchedule = async (req, res) => {
  let responseData = {};
  const input = req.body;
  const bookingId = req.params.bookingId;
  console.log("bookID", bookingId);
  try {
    const response = await pool.query(
      `UPDATE bookings 
    SET comment='${input.comment}', rating=${input.rating}, user_status='done', coach_status='done' WHERE booking_id = $1`,
      [bookingId]
    );
    responseData.data = response;
  } catch (error) {
    responseData.success = false;
    console.log(error);
  } finally {
  }
  res.status(200).send(responseData); //success
  return res.end();
};

module.exports = deleteSchedule;
