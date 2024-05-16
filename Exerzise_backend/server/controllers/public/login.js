const pool = require("../../db/pool");
const common = require("../../common/common");

const login = async (req, res) => {
  let responseData = {};
  let input = req.body;
  let { username } = input;
  console.log(`input`, input);

  try {
    let findUser = `SELECT * FROM public.users WHERE username = '${username}'`;
    const serverResponse = await pool.query(findUser);
    // if (serverResponse.rows.length === 0) {
    //   responseData.success = false;
    //   responseData.message = "user not found case1 l";
    //   return res.status(403).send(responseData); //success
    // }
    console.log("serverResponse.password", serverResponse.rows[0].password);
    console.log("input.password", input.password);
    if (serverResponse.rowCount < 1) {
      // user not found
      responseData.success = false;
      responseData.message = "User is not found";
      return res.status(403).json(responseData); //success
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
        responseData.success = false;
        responseData.message = "Password is not matched";
        return res.status(403).json(responseData); //success
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
        responseData.message = "Successfully logged in";
        responseData._token = await common.tokenExc.generateToken(
          responseData.data
        );
        res.status(200).json(responseData); //success
      }
    }
  } catch (error) {
    responseData.success = false;
    responseData.message = "Something Wrong Please Try Again";
    console.log(error);
    res.status(500).json(responseData); //success
  } finally {
  }
  // res.status(200).send(responseData); //success
};

module.exports = login;
