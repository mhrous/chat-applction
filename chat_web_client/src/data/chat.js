import {
  observable,
  action,
  computed,
  toJS,
  extendObservable,
  set
} from "mobx";

import Api from "../lib/api";
import socket from "../lib/socket";
import voice from "../lib/record";

import user from "./user";
import { logOutLocal, isImage } from "../lib";

const sendToUSerArray = (myUser, groub) => {
  let idArray;
  if (myUser) {
    idArray = [myUser.id, user.info.id];
  } else if (groub) {
    idArray = groub.members.map(e => e.id);
  }
  console.log(idArray);
  return idArray;
};

class Chat {
  @observable id = null;
  @observable groupData = null;
  @observable text = "";
  @observable userChat = [];
  @observable userChatGroub = [];
  @observable chatContent = [];
  @observable user = null;
  @observable search = "";
  @observable searchForChat = "";
  @observable openModelChangeColor = false;
  @observable openModelChangeEmoji = false;
  @observable openModelSearch = false;
  @observable colorSelect = "";

  @observable emojiSelect = "blue-heart";
  @observable addEmoji = false;
  @observable addEmojiNode = null;

  @observable notification = {};

  @observable block = null;

  @observable startRecord= false;

  // start fetch data from serve

  @action
  clear() {
    this.groupData = null;
    this.id = null;
    this.text = "";
    this.userChat = [];
    this.userChatGroub = [];
    this.chatContent = [];
    this.user = null;
    this.search = "";
    this.searchForChat = "";
    this.openModelChangeColor = false;
    this.openModelChangeEmoji = false;
    this.openModelSearch = false;
    this.colorSelect = "";

    this.emojiSelect = "blue-heart";
    this.addEmoji = false;
    this.addEmojiNode = null;

    this.notification = {};
    this.block = null;
    this.startRecord= false
  }
  //keall intervel wehen end page
  end() {}

  @action
  initNotification() {
    const obj = [...this.userChat, ...this.userChatGroub];
    const copy = toJS(this.notification);
    this.notification = {};
    extendObservable(this.notification, {});
    obj.map(e => {
      const value = copy[e.id] ? copy[e.id] : 0;

      set(this.notification, { [e.id]: value });
    });
  }

  @computed
  get getUser() {
    return toJS(this.user);
  }
  @action
  async getMessagesFromServer() {
    if (!this.id) return;
    const response = await Api.get(`chat/${this.id}`);
    const status = response.status;
    if (status === 200) {
      const json = await response.json();
      this.chatContent = json.messages;
      this.colorSelect = json.color ? json.color : "rgb(0, 132, 255)";
      this.emojiSelect = json.emoji ? json.emoji : "blue-heart";
      this.block = json.block ? json.block : null;
    }
  }

  @action
  logOut(e) {
    logOutLocal();
    user.setInfo(null);
    socket.close();
  }

  @action
  setIdAndUser(id, user) {
    this.groupData = null;
    this.id = id;
    this.user = toJS(user);
    this.chatContent = [];
    set(this.notification, { [id]: 0 });
    this.getMessagesFromServer();
  }
  @action
  setIdAndGroup(id, name) {
    this.groupData = name;
    this.id = id;
    this.user = null;
    this.chatContent = [];
    set(this.notification, { [id]: 0 });
    this.getMessagesFromServer();
  }

  @action
  send(e) {
    if (this.text === "" || !this.id) return;
    const { name, color, id } = user.info;
    let obj = {
      text: this.text,
      user: {
        name,
        color,
        id
      }
    };
    this.text = "";
    this.sendMessage(obj);
  }

  @action
  changeSitting(data) {
    if (data.color) {
      this.colorSelect = data.color;
    }
    if (data.emoji) {
      this.emojiSelect = data.emoji;
    }
  }
  @action
  async fileUpload(e) {
    const { name, color, id } = user.info;

    const obj = {
      messages_id: this.id,

      id: sendToUSerArray(this.user, this.groupData),
      type: "file",
      user: {
        name,
        color,
        id
      }
    };
    console.log(e.target.files[0], 5555888888);
    socket.sendFile(e.target.files[0], obj);
  }

  @action
  async sendMessage(obj) {
    if (!this.id) return;

    // const response = await Api.post(`chat/message/${this.id}`, {
    //   message: obj
    // });

    socket.sendMasseage({
      data: obj,
      messages_id: this.id,
      id: sendToUSerArray(this.user, this.groupData),

      type: "messages"
    });

    // const status = response.status;
    // if (status === 200) {
    // }
  }

  @action
  handleChange(e) {
    let value = e.target.value;
    const name = e.target.name;
    if (value === " " || value === "\n") return;
    switch (name) {
      case "text":
        if (value.endsWith("</i")) {
          let lastIndex = value.lastIndexOf("<i");
          value = value.substring(0, lastIndex);
        }
        this.text = value;
        break;

      case "search":
        this.search = value;
        break;
      case "searchForChat":
        this.searchForChat = value;
        break;
      default:
        break;
    }
  }

  @action
  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.send();
    }
  }

  @action
  async getChatList() {
    if (!user.info) return;
    const response = await Api.get(`users/chat-list/${user.info.id}`);
    const status = response.status;
    if (status === 200) {
      const json = await response.json();
      console.log(json);
      this.userChat = json.filter(e => !e.data.name);
      this.userChatGroub = json.filter(e => e.data.name);
    }
    this.getMessagesFromServer();
    this.initNotification();
  }

  @computed
  get UserChatAfterSearch() {
    return this.userChat.filter(item => {
      item = toJS(item);
      const other =
        item.data[1].id !== user.info.id ? item.data[1] : item.data[0];
      return other.name.startsWith(this.searchForChat);
    });
  }

  @computed
  get UserChatGroupAfterSearch() {
    return this.userChatGroub.filter(item => {
      item = toJS(item);
      console.log(item);
      return item.data.name.startsWith(this.searchForChat);
    });
  }

  searchOnText(str) {
    if (this.search === "") {
      return str;
    }
    str = str.replace(
      new RegExp(this.search, "g"),
      "<span class='a'>" + this.search + " </span>"
    );

    let array = str.match(/<i(.*?)<\/i>/g);
    if (array) {
      array = array.map(val => {
        val = val.replace(/<span class='a'>/g, "");
        val = val.replace(/ <\/span>/g, "");
        return val;
      });
      str = array.join("");
    }
    return str;
  }

  @computed
  get messages() {
    return this.chatContent.map(e => {
      let obj = toJS(e);
      if (obj.text) obj.text = this.searchOnText(obj.text);
      return obj;
    });
  }

  @action
  handleOpenPopover(event, type) {
    event.preventDefault();
    switch (type) {
      case "emoji":
        this.addEmoji = true;

        this.addEmojiNode = event.target;

        break;

      default:
        break;
    }
  }

  @action
  handleClosePopover(obj) {
    const data = obj.data;
    const type = obj.type;
    switch (type) {
      case "emoji":
        if (data) {
          this.text = `${this.text}<i class='twa twa-${data}'></i>`;
        } else {
          this.addEmoji = false;
        }
        break;

      default:
        break;
    }
  }

  @action
  handleOpenModel(type) {
    switch (type) {
      case "color":
        if (this.block) break;
        this.openModelChangeColor = true;
        break;
      case "emoji":
        if (this.block) break;
        this.openModelChangeEmoji = true;
        break;
      case "serach":
        this.openModelSearch = true;
        break;
      default:
        break;
    }
  }

  @action
  handleCloseModel(obj) {
    const data = obj.data;
    const type = obj.type;
    switch (type) {
      case "color":
        if (data) {
          this.colorSelect = data;
          socket.sendMasseage({
            data: {
              color: this.colorSelect,
              type: "settings",
              text: "color change"
            },
            messages_id: this.id,
            id: sendToUSerArray(this.user, this.groupData),

            type: "messages"
          });
        }
        this.openModelChangeColor = false;
        break;
      case "emoji":
        if (data) {
          this.emojiSelect = data;
          socket.sendMasseage({
            data: {
              emoji: this.emojiSelect,
              type: "settings",
              text: "emoji change"
            },
            messages_id: this.id,
            id: sendToUSerArray(this.user, this.groupData),

            type: "messages"
          });
        }
        this.openModelChangeEmoji = false;
        break;
      case "serach":
        this.openModelSearch = false;
        this.search = "";
        break;

      default:
        break;
    }
  }

  @computed
  get getFiles() {
    return this.chatContent.filter(e => e.type === "file");
  }
  @computed
  get getImages() {
    return this.chatContent.filter(e => e.type === "file" && isImage(e.name));
  }

  @computed
  get blockText() {
    return this.block != user.info.id ? "block" : "Un Block";
  }

  blockUser() {
    const data = this.block ? null : user.info.id;
    socket.sendMasseage({
      type: "block",
      messages_id: this.id,
      id: [user.info.id, this.user.id],
      data
    });
  }
  @computed
  get blockMessages() {
    return this.block != user.info.id
      ? "Conversation has been blocked"
      : "Please unblock";
  }

  @action
  Record(){
    if(!this.startRecord){
      voice.startRecording()
      this.startRecord= true;
    }
    else{
      this.startRecord= false;
      const file= voice.getFile();
      this.fileUpload({target:{files:[file]}})

    }
  }
}

export default new Chat();
