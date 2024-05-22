const pool = require("../db/pool");
const utilityFunctions = require("../common/utilityfunction");
const { v4: uuidv4 } = require("uuid");

const setCoachSchedule = async (req, res) => {
  let responseData = {};
  console.log("setCoachTime");
  let input = req.body;
  let coachParam = req.params.coachId;
  try {
    let sqlInsert = `INSERT INTO coachtime (time_id, day, date, available_time,endofavailable_time,price,user_id) VALUES ($1, $2, $3, $4, $5, $6,$7)`;
    let sqlUpdate = `UPDATE coachtime SET time_id=$1, day=$2, date=$3, available_time=$4,endofavailable_time=$5,price=$6,user_id=$7 WHERE day=$2`;
    // set price by time interval
    input.forEach(async (el, index) => {
      const param = [
        uuidv4(),
        input[index].day,
        input[index].date,
        input[index].availableTime,
        input[index].endofAvailableTime,
        "100",
        coachParam, //get coach id here
      ];
      // console.log("day input", index, input[index].day);
      let sqlFind = `SELECT * from coachtime where day = ${input[index].day}`;
      const dupeResponse = await pool.query(sqlFind);
      if (dupeResponse.rowCount > 0) {
        await pool.query(sqlUpdate, param);
      } else {
        // insert
        await pool.query(sqlInsert, param);
      }
    });
    responseData.message = "we have updated your schedule";
    return res.status(201).send(responseData);
  } catch (error) {
    responseData.message = "Something Wrong with setting data";
    console.log(error);
    res.status(500).json(responseData);
  } finally {
  }
};

module.exports = setCoachSchedule;
