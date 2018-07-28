const userDB = require("../models/user");
const { encrypt, decrypt } = require("../lib");

//hello ma7rous it is a beautiful day
const register = async (req, res, next) => {
  try {
    const { user } = req.body;
    const obj = await userDB.find({ email: user.email });
    let response = {};
    if (obj) {
      response.emailError = "email has been already taken";
    } else if (user.password.length < 6) {
      response.passwordLengthError =
        "Password must contain at least 6 characters";
    } else {
      console.log(user, 1);

      user.password = encrypt(user.password);

      response = await userDB.add(user);
      delete response.chatList;
    }
    res.status(200).json(response);

    next();
  } catch (e) {
    next(e);
  }
};

const logIn = async (req, res, next) => {
  try {
    const { user } = req.body;
    const obj = await userDB.find({ email: user.email });
    let response = {};
    if (!obj) {
      response.emailError = "There is no matching email";
    } else {
      const password = decrypt(obj.password);
      if (user.password !== password) {
        response.passwordError = "Password is wrongl";
      } else {
        delete obj.chatList;
        response = obj;
      }
    }
    res
      .status(200)
      .status(200)
      .json(response);
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = { register, logIn };
