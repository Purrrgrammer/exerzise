const pool = require("../db/pool");
const completeBooking = async (req, res) => {
  let responseData = {};
  const input = req.body;
  const { bookingId } = req.params;
  // const bookingId = req.params.bookingId;
  console.log("bookID", bookingId);
  try {
    const response = await pool.query(
      `UPDATE bookings 
    SET comment='${input.comment}', rating=${input.rating}, user_status='done', coach_status='done' WHERE booking_id = $1`,
      [bookingId]
    );
    // responseData.data = response;
    responseData.message = `Booking ${bookingId} is completed`;
    res.status(200).json(responseData); //success
  } catch (error) {
    responseData.success = false;
    console.log(error);
    res.status(5000).json(responseData); //success
  } finally {
  }
  return res.end();
};

module.exports = completeBooking;
