const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const { generate } = require("shortid");

class Chat {
  create() {
    const id = generate();
    let obj = {};
    const adapter = new FileSync(`../data/chat/${id}.json`);
    const db = low(adapter);
    db.defaults({ id, messages: [], block: null }).write();
    return id;
  }

  getMessages(id) {
    const adapter = new FileSync(`../data/chat/${id}.json`);
    const db = low(adapter);
    return db

      .cloneDeep()

      .value();
  }
  changeSittingToChat(id, data) {
    const adapter = new FileSync(`../data/chat/${id}.json`);
    const db = low(adapter);
    if (data.color) {
      db.set("color", data.color).write();
    }
    if (data.emoji) {
      db.set("emoji", data.emoji).write();
    }
  }

  addMessage(id, obj) {
    const adapter = new FileSync(`../data/chat/${id}.json`);
    const db = low(adapter);

    obj.id = generate();
    db.get("messages")
      .push(obj)
      .write();
    return obj.id;
  }
  setBlock(id, obj) {
    const adapter = new FileSync(`../data/chat/${id}.json`);
    const db = low(adapter);

    db.set("block", obj).write();
  }
}

const chatDB = new Chat();

module.exports = chatDB;
