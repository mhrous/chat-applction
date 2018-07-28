const server = require("ws").Server;
const userDB = require("./models/user");
const timeDB = require("./models/userTime");
const chatDB = require("./models/chat");
const fs = require("fs");

class ServerSocket {
  constructor() {
    this.server = new server({ port: process.env.PORT || 4002 });
    this.usersSocket = new Map();

    this.filepath = ".";
  }

  run() {
    this.server.on("connection", (ws, req) => {
      const id = req.url.slice(1);
      this.newConnect(ws, id);

      ws.on("message", message => {
        this.receivingData(message);
      });

      ws.on("close", () => {
        this.closeConnect(ws, id);
      });
    });
  }

  async newConnect(ws, id) {
    //new user regester
    if (!this.usersSocket.get(id)) {
      this.usersSocket.set(id, []);
    }

    //add sokect
    this.usersSocket.get(id).push(ws);
    //change time open
    await timeDB.add(id, -1);
    const usersTime = await timeDB.getAll();

    //sent user time
    const obj = {
      type: "usersTime",
      data: usersTime
    };

    ws.send(JSON.stringify(obj));

    //sent for all user to note open user
    const userOpen = {
      type: "openUser",
      data: id
    };

    this.broadcast(userOpen);
  }
  closeConnect(ws, id) {
    let array = this.usersSocket.get(id);
    let index = array.indexOf(ws);
    array = [...array.slice(0, index), ...array.slice(index + 1)];
    this.usersSocket.set(id, array);
    if (array.length === 0) {
      timeDB.add(id, new Date().toJSON());
      const userClose = {
        type: "closeUser",
        data: id
      };

      this.broadcast(userClose);
    }
  }
  broadcast(data) {
    this.usersSocket.forEach((value, key) => {
      value.map(e => e.send(JSON.stringify(data)));
    });
  }
  sendToUser(id, data) {
    const userSokets = this.usersSocket.get(id);
    if (userSokets) {
      userSokets.map(e => {
        e.send(JSON.stringify(data));
      });
    }
  }
  async receivingData(obj) {
    if (typeof obj === "string") {
      obj = JSON.parse(obj);
      const { type, data, id, messages_id } = obj;
      let pk;
      switch (type) {
        case "messages":
          pk = await chatDB.addMessage(messages_id, data);

          data[id] = pk;
          id.map(e => {
            this.sendToUser(e, { data, type: "messages", messages_id });
          });
          if (data.type == "settings") {
            await chatDB.changeSittingToChat(messages_id, data);
          }
          break;
        case "block":
          await chatDB.setBlock(messages_id, data);
          console.log(data);

          id.map(e => {
            this.sendToUser(e, {
              data: { block: data, messages_id },
              type: "block"
            });
          });
          break;

        case "file":
          this.filepath = obj.path;

          pk = await chatDB.addMessage(messages_id, {
            user: obj.user,
            type: "file",
            path: this.filepath,
            name: obj.name
          });

          id.map(e => {
            this.sendToUser(e, {
              data: {
                id: pk,
                user: obj.user,
                type: "file",
                path: this.filepath,
                name: obj.name
              },
              type: "file",
              messages_id
            });
          });
          break;
        case "askToPlay":
          id.map(e => {
            this.sendToUser(e, { data, type: "askToPlay" });
          });
          break;
        case "noPlay":
          id.map(e => {
            this.sendToUser(e, { data, type: "noPlay" });
          });
          break;
        case "yesPlay":
          id.map(e => {
            this.sendToUser(e, { data, type: "yesPlay" });
          });
          break;
        case "play":
          id.map(e => {
            this.sendToUser(e, { data, type: "play" });
          });
          break;

        default:
          break;
      }
    } else {
      fs.writeFile(__dirname + "/public/" + this.filepath, obj, error => {
        if (error) {
        }
      });
    }
  }
}

const myServer = new ServerSocket();

module.exports = myServer;
