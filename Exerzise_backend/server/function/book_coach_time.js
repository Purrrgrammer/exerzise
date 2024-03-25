const pool = require("../db/pool");
const { v4: uuidv4 } = require("uuid");

const bookCoachTime = async (req, res) => {
  let responseData = {};
  let isFound = false;
  try {
    let input = req.body;
    let coachParam = req.params.coachId;
    // console.log(`coachParam`, coachParam);
    // console.log("input", input);
    let sqlFind = `SELECT * FROM bookings WHERE date = $1 and day = $2 and time_from = $3 and time_to = $4;`;

    for (let index = 0; index < input.length; index++) {
      const findParam = [
        input[index].date,
        input[index].day,
        input[index].timeFrom,
        input[index].timeTo,
      ];
      const dupeResponse = await pool.query(sqlFind, findParam);
      if (dupeResponse.rowCount > 0) {
        isFound = true;
        responseData.message = "found duplicate bookings by the time";
        console.log(responseData.message);
        responseData.success = false;
        console.log("dupeResponse", dupeResponse.rowCount > 0);
      }

      if (isFound === false) {
        console.log("successfully booked");
        console.log("dupeResponse", dupeResponse.rowCount > 0);
        let sql = `INSERT INTO bookings (booking_id,user_id,coach_id,
      date,time_from,time_to,day,session,price, user_status,coach_status,rating,comment,payment,typetime,coach_phonenumber,user_phonenumber)
VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9,$10,$11,$12,$13,$14,$15,
  (select users.phone_number from users where user_id = '${coachParam}'),
  (select users.phone_number from users where user_id = '${input[0].userId}')
  );`;
        //find by date day time from time to
        // [] date day timefrom timeto
        // ,user_phonenumber,coach_phonenumber
        const param = [
          uuidv4(),
          input[index].userId, //userId from local //input
          coachParam, //coachID from coach or param //input
          input[index].date, //input
          input[index].timeFrom, //input
          input[index].timeTo, //input
          input[index].day, //input
          input[index].session, //join from coach
          input[index].price, //price from coach //input
          "ongoing", //set ongoing user status
          "ongoing", //set ongoing coach status
          null, //null rating
          null, //null comment
          null, //null payment
          30, //type time
          //  3 joins 1.coachphone 2.session 3.userphone add=>user/coach firstname, lastname session from coach
        ];
        const result = [];
        const response = await pool.query(sql, param);
        result.push(response);
        responseData.success = true;
        responseData.data = result;
      }
    }
  } catch (error) {
    responseData.success = false;
    console.log(error);
  } finally {
  }
  if (isFound === false) {
    res.status(200).send(responseData);
  } else {
    res.status(409).send(responseData);
  }
};

module.exports = bookCoachTime;

///res  = success,message,data
