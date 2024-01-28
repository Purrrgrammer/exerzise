const pool = require("../db/pool");
const common = require("../common/common");
const { v4: uuidv4 } = require("uuid");

const setCoachTime = async (req, res) => {
  let responseData = {};
  try {
    let input = req.body;
    console.log(input);
    const param = [
      uuidv4(),
      input.date,
      input.availableTime,
      input.endofAvailableTime,
      "100",
      input.userId,
    ];
    let sql = `INSERT INTO coachtime (time_id, date, available_time,endofavailable_time,price,user_id) VALUES ($1, $2, $3, $4, $5, $6)`;
    const result = await pool.query(sql, param);

    pool.query(
      `INSERT INTO coachtime (time_id, date, available_time,endofavailable_time,price,user_id) VALUES ($1, $2, $3, $4, $5, $6)`;
      `INSERT INTO department_employee (department_id, employee_id, employee_number) VALUES ?`,
      [
        employees_array.map((employee) => [
          employee.department_id,
          employee.employee_id,
          employee.employee_number,
        ]),
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("success: ", res);
        result(null, res);
      }
    );
  } catch (error) {
    responseData.success = false;
    console.log(error);
  } finally {
  }
  res.status(200).send(responseData); //success
};

module.exports = register;
