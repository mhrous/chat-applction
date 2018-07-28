const userDB = require("../models/user");
const chatDB = require("../models/chat");
const myServer = require("../socketServer");

const getChat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await chatDB.getMessages(id);
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

const createChat = async (req, res, next) => {
  try {
    const { data } = req.body;
    let response = { id: null };
    let userId;
    let isHas = false;

    if (data.name) {
      userId = data.members.map(e => e.id);
    } else {
      userId = data.map(e => e.id);
      const chatList = await userDB.getChatList(userId[0]);
      for (let i = chatList.length - 1; i >= 0; i--) {
        const list = chatList[i];

        if (
          !list.name &&
          list.data[1] &&
          list.data[0] &&
          userId.indexOf(list.data[1].id) !== -1 &&
          userId.indexOf(list.data[0].id) !== -1
        ) {
          isHas = true;
          response.id = list.id;
          break;
        }
      }
    }

    if (!isHas) {
      const id = await chatDB.create();
      userId.map(async e => {
        const obj = { id, data };
        const chat = await userDB.addChat(e, obj);
        myServer.sendToUser(e, {
          type: "new chat",
          data: obj
        });
      });
      response.id = id;
    } else {
    }
    response.data = data;

    res.status(200).json(response);
    next();
  } catch (e) {
    next(e);
  }
};
// const newMessage = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { message } = req.body;
//     const response = await chatDB.addMessage(id, message);
//     res.status(200).json(response);

//     next();
//   } catch (e) {
//     next(e);
//   }
// };
module.exports = { getChat, createChat };
