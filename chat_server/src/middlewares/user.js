const userDB = require("../models/user");

const getAllUsers = async (req, res, next) => {
  try {
    let response = await userDB.getAllUser();
    res.status(200).json(response);
    next();
  } catch (e) {
    next(e);
  }
};
const getChatList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await userDB.getChatList(id);
    res.status(200).json(response);
    next();
  } catch (e) {
    next(e);
  }
};
module.exports = { getAllUsers, getChatList };
