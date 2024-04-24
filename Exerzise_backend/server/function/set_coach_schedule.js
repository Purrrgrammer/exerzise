const pool = require("../db/pool");
const utilityFunctions = require("./utilityfunction");
const { v4: uuidv4 } = require("uuid");

const setCoachSchedule = async (req, res) => {
  let responseData = {};
  try {
    console.log("setCoachTime");
    let input = req.body;
    let coachParam = req.params.coachId;
    console.log(`coachParam`, coachParam);
    console.log("input", input);
    const result = [];
    let isFound = false;

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
      console.log("day input", index, input[index].day);
      let sqlFind = `SELECT * from coachtime where day = ${input[index].day}`;
      const dupeResponse = await pool.query(sqlFind);
      if (dupeResponse.rowCount > 0) {
        const updataResponse = await pool.query(sqlUpdate, param);
        console.log("update case");
      } else {
        // insert
        const insertResponse = pool.query(sqlInsert, param);
        console.log("insert case");
      }
    });

    // for (let index = 0; index < input.length; index++) {
    //   let sqlFind = `SELECT * from coachtime where day = ${input[index].day}`;
    //   const dupeResponse = await pool.query(sqlFind);
    //   if (dupeResponse.rowCount > 0) {
    //     isFound = true;
    //   }
    //   if (dupeResponse.rowCount <= 0 && isFound === false) {
    //     const param = [
    //       uuidv4(),
    //       input[index].day,
    //       input[index].date,
    //       input[index].availableTime,
    //       input[index].endofAvailableTime,
    //       "100",
    //       coachParam, //get coach id here
    //     ];
    //     console.log(`param`, param);
    //     const response = await pool.query(sql, param);
    //     result.push(response);
    //     responseData.data = result;
    //   }
    // }
  } catch (error) {
    responseData.success = false;
    console.log(error);
  } finally {
  }
  res.status(200).send(responseData); //success
};

module.exports = setCoachSchedule;
