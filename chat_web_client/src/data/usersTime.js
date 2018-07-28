import { set, extendObservable, observable, action } from "mobx";

class Time {
  @observable usersTime = {};
  @observable time = {};

  constructor() {
    setInterval(() => this.changeTime(), 60000);
  }

  @action
  changeTime() {
    const t = new Date();

    for (const key in this.usersTime) {
      const tText = this.usersTime[key];

      if (tText !== -1) {
        const t2 = new Date(tText);

        const value = t.getTime() - t2.getTime();

        set(this.time, { [key]: this.showTime(value) });
      } else {
        set(this.time, { [key]: this.showTime(-1) });
      }
    }
  }

  @action
  setUsersTime(data) {
    this.time = {};
    this.usersTime = {};
    extendObservable(this.usersTime, data);
    extendObservable(this.time, data);
    this.changeTime();
  }

  showTime(val) {
    if (val === -1) {
      return "online";
    }
    val /= 60000;
    if (val < 60) {
      return `active ${Math.floor(val)} m ago `;
    }
    val /= 60;
    if (val < 24) {
      return `active ${Math.floor(val)} h ago `;
    }
    val /= 24;
    return `active ${Math.floor(val)} d ago`;
  }

  @action
  openUser(id) {
    this.usersTime[id] = -1;
    this.time[id] = "online";
  }
  @action
  closeUser(id) {
    const t = new Date();
    this.usersTime[id] = t;
    this.time[id] = `active 0 m ago`;
  }
}

const time = new Time();
export default time;
