const low = require("lowdb");
const { generate } = require("shortid");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("../data/userTime.json");
const db = low(adapter);

class Time {
  constructor() {
    db.defaults({}).write();
  }

  add(id, data) {
    db.set(id, data).write();
  }
  getAll() {
    return db.getState();
  }
}

const timeDB = new Time();

module.exports = timeDB;
