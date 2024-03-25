const pool = require("../db/pool");
const common = require("../common/common");

const login = async (req, res) => {
  let responseData = {};
  try {
    let input = req.body;
    console.log(`input`, input);
    let findUser = `SELECT * FROM public.users WHERE username = $1;`;
    let userParam = [input.username];
    const serverResponse = await pool.query(findUser, userParam);
    console.log("serverResponse.password", serverResponse.rows[0].password);
    console.log("input.password", input.password);
    if (serverResponse.rowCount < 1) {
      // user not found
      responseData.message = "user not found";
      responseData.success = false;
    } else {
      console.log("user found");
      const decryptedPassword = await common.passwordExc.decryptPassword(
        input.password,
        serverResponse.rows[0].password
      );
      console.log("comparing password");
      console.log("decrypt result", decryptedPassword);

      if (!decryptedPassword) {
        //password is not matched
        console.log("password not matched");
        responseData.message = "password is not matched";
        responseData.success = false;
      } else {
        //password matched login cleared
        console.log("password matched");
        responseData.data = serverResponse.rows.map((i) => ({
          username: i.username,
          userId: i.user_id,
          firstname: i.first_name,
          lastname: i.last_name,
          role: i.role,
          detail: i.detail,
          userImage: i.user_image,
          email: i.email,
          phonenumber: i.phone_number,
        }))[0];
        responseData.success = true;
        responseData._token = await common.tokenExc.generateToken({
          responseData,
        });
        responseData.message = "successfully logged in";
      }
    }
  } catch (error) {
    responseData.success = false;
    responseData.message = "something wrong please try again";
    console.log(error);
  } finally {
  }
  res.status(200).send(responseData); //success
};

module.exports = login;
