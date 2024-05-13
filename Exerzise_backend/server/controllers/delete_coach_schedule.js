const pool = require("../db/pool");
const common = require("../common/common");

const deleteSchedule = async (req, res) => {
  let responseData = {};
  const coachId = req.params.coachId;
  const input = req.body;
  let status = 200;
  try {
    const response = await pool.query(
      `DELETE FROM coachtime WHERE user_id = '${coachId}' and day = ${input.day}`
    );

    if (response.rowCount > 0) {
      responseData.isSuccess = true;
      responseData.message = "delete success";
      status = 200;
    } else {
      responseData.isSuccess = false;
      responseData.message = "delete failed";
      status = 403;
    }
  } catch (error) {
    responseData.success = false;
    console.log(error);
  } finally {
    res.status(status).send(responseData); //success
  }
  // res.status(200).send(responseData); //success
  return res.end();
};

module.exports = deleteSchedule;
