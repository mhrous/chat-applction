import { chat, time, game } from "../data";
import swal from "sweetalert";

import { set } from "mobx";
class Socket {
  constructor() {
    this.socket = null;
  }
  close() {
    this.socket.close();
    this.socket = null;
  }
  run(id) {
    if (this.socket !== null) return;
    this.socket = new WebSocket(`ws://localhost:4002/${id}`);
    this.socket.onmessage = data => {
      this.receivingData(data.data);
    };
  }

  async sendMasseage(obj) {
    if (chat.block && obj.type != "block") return;
    this.socket.send(JSON.stringify(obj));
  }
  async sendFile(file, obj) {
    if (chat.block) return;
    const { user, id, type, messages_id } = obj;

    const fileData = {
      name: file.name,
      path: (user.id + file.name).replace(/ /g, ""),
      user,
      id,
      type,
      messages_id
    };
    this.socket.send(JSON.stringify(fileData));
    this.socket.send(file);
  }
  receivingData(obj) {
    obj = JSON.parse(obj);
    const { type, data, messages_id } = obj;
    console.log(1111111111111111, "yse play", type);

    switch (type) {
      case "messages":
        if (messages_id === chat.id) {
          chat.chatContent.push(data);
          if (data.type === "settings") {
            chat.changeSitting(data);
          }
        } else {
          const notification = chat.notification[messages_id] + 1;
          set(chat.notification, { [messages_id]: notification });
        }

        break;
      case "usersTime":
        time.setUsersTime(data);
        break;
      case "openUser":
        time.openUser(data);
        break;
      case "closeUser":
        time.closeUser(data);
        break;
      case "file":
        if (messages_id === chat.id) {
          chat.chatContent.push(data);
        } else {
          const notification = chat.notification[messages_id] + 1;
          set(chat.notification, { [messages_id]: notification });
        }
        break;

      case "new chat":
        set(chat.notification, { [data.id]: 0 });
        console.log(data, 144444);
        !data.data.name
          ? chat.userChat.push(data)
          : chat.userChatGroub.push(data);

      case "block":
        console.log(data, this.id, data.messages_id);
        if (chat.id == data.messages_id) chat.block = data.block;

        break;

      case "askToPlay":
        if (game.player) {
          this.sendMasseage({
            data: {
              m: "يا زلمة انا عم العب حل عن سماي "
            },
            type: "noPlay",
            id: [data.user.id]
          });
          return;
        }
        game.openModelAskGame = true;
        game.player = data.user;

        break;
      case "noPlay":
        swal("Error", data.m, "error");
        game.player = null;

        break;
      case "yesPlay":
        game.player = data.user;

        console.log(1111111111111111, "yse play");
        game.play = true;
        game.my = "x";
        game.term = true;

        break;
      case "play":
        game.move[data.pos] = data.my;
        game.term = !game.term;
        game.testResult();

        break;
      default:
        break;
    }
  }
}

const socket = new Socket();
export default socket;
