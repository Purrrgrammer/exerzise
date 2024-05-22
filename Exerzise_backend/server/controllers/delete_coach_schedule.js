const pool = require("../db/pool");
const common = require("../common/common");

const deleteSchedule = async (req, res) => {
  console.log(`deleting schedule`);

  let responseData = {};
  const coachId = req.params.coachId;
  const input = req.body;
  let status;
  try {
    const response = await pool.query(
      `DELETE FROM coachtime WHERE user_id = '${coachId}' and day = ${input.day}`
    );
    if (response.rowCount > 0) {
      responseData.isSuccess = true;
      responseData.message = "Delete Success";
      status = 200;
    } else {
      responseData.isSuccess = false;
      responseData.message = "Delete Failed";
      status = 403;
    }
  } catch (error) {
    responseData.success = false;
    console.log(error);
    status = 500;
  } finally {
    res.status(status).send(responseData); //success
  }
  return res.end();
};

module.exports = deleteSchedule;
