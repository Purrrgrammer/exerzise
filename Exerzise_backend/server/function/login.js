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
      responseData.success = false;
      responseData.data = "user not found";
    } else {
      console.log("user found");
      console.log("comparing");
      const decryptedPassword = await common.passwordExc.decryptPassword(
        input.password,
        serverResponse.rows[0].password
      );
      console.log("decrypt result", decryptedPassword);

      if (!decryptedPassword) {
        //password not matched
        console.log("password not matched");
        responseData.data = "password is not matched";
        responseData.success = false;
      } else {
        //password matched
        console.log("password matched");
        responseData.data = serverResponse.rows.map((i) => ({
          username: i.username,
          userId: i.user_id,
          firstName: i.first_name,
          lastName: i.last_name,
          role: i.role,
          detail: i.detail,
          userImage: i.user_image,
          email: i.email,
        }))[0];
      }
      responseData._token = await common.tokenExc.generateToken({
        responseData,
      });
      responseData.success = true;
    }
  } catch (error) {
    responseData.success = false;
    console.log(error);
  } finally {
  }
  res.status(200).send(responseData); //success
};

module.exports = login;
