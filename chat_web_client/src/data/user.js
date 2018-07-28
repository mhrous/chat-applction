import { observable, action, computed } from "mobx";

class User {
  @observable info = null;

  @action
  setInfo(obj) {
    this.info = obj;
  }

  @computed
  get getinfo() {
    return this.info;
  }
}
const user = new User();

export default user;
