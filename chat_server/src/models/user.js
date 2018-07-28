const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const { generate } = require("shortid");

const adapter = new FileSync("../data/user.json");
const db = low(adapter);

class User {
  constructor() {
    db.defaults({ users: [] }).write();
  }

  add(obj) {
    obj.id = generate();
    obj.chatList = [];
    obj.last = "";
    db.get("users")
      .push(obj)
      .write();
    return Object.assign({}, obj);
  }

  find(obj) {
    const user = db
      .get("users")
      .find(obj)
      .cloneDeep()
      .value();
    return user;
  }

  getUser(id) {
    const user = this.find({ id });
    delete user.chatList;
    return user;
  }

  getChatList(id) {
    const user = this.find({ id });
    return user.chatList;
  }

  addChat(id, obj) {
    db.get("users")
      .find({ id })
      .get("chatList")
      .push(obj)
      .write();

    return Object.assign({}, obj);
  }
  getinfoFromUser(obj) {
    delete obj.chatList;
    delete obj.last;
    delete obj.password;

    return obj;
  }
  getAllUser() {
    let users = db
      .get("users")
      .cloneDeep()
      .value();
    users = users.map(e => this.getinfoFromUser(e));
    return users;
  }
  getUserID() {
    let idArray = db
      .get("users")
      .map("id")
      .cloneDeep()
      .value();
    return idArray;
  }
}

const userDB = new User();

module.exports = userDB;
