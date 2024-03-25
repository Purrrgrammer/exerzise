const pool = require("../db/pool");
const common = require("../common/common");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res) => {
  let responseData = {};

  try {
    let input = req.body;
    console.log(input);

    let dupeUser = `SELECT * FROM public.users WHERE username = $1;`;
    let dupeParam = [input.username]; //prepare sql query
    const dupeResponse = await pool.query(dupeUser, dupeParam);

    if (dupeResponse.rowCount > 0) {
      responseData.success = false;
      responseData.data = "duplicated user";
    } else {
      console.log(input.password);
      const cryptedPassword = await common.passwordExc.cryptPassword(
        input.password
      );

      console.log("cryptedPassword", cryptedPassword);
      let sql = `INSERT INTO public.users(
	user_id, username, password, first_name, last_name, role,session, detail,phone_number, user_image)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9,$10);`;
      const param = [
        uuidv4(),
        input.username,
        cryptedPassword,
        input.firstname,
        input.lastname,
        input.role,
        // these could be insert later on
        input.session,
        input.detail,
        input.phonenumber,
        input.userimage,
      ];
      const result = await pool.query(sql, param);
      responseData.success = true;
      responseData.data = result;
    }
  } catch (error) {
    responseData.success = false;
    console.log(error);
  } finally {
  }
  res.status(200).send(responseData); //success
};

module.exports = register;
