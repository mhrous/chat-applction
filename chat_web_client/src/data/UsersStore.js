import { observable, action, computed, toJS } from "mobx";
import swal from "sweetalert";

import Api from "../lib/api";
import user from "./user";

import chat from "./chat";

class UserStore {
  @observable users = [];
  @observable search = "";
  @observable group = false;
  @observable usersSelect = [];
  @observable groupName = "";
  @observable done = false;

  @action
  groupToggle() {
    const bool = this.group;
    if (bool) {
      this.group = false;
      this.users = [...this.users, ...this.usersSelect];
      this.usersSelect = [];
      this.groupName = "";
    } else {
      this.group = true;
    }
  }

  clear() {
    this.users = [];
    this.search = "";
    this.group = false;
    this.usersSelect = [];
    this.groupName = "";
    this.done = false;
  }

  @action
  handleChange(e) {
    let value = e.target.value;
    const name = e.target.name;
    if (value === " " || value === "\n") return;
    switch (name) {
      case "search":
        this.search = value;
        break;
      case "name":
        this.groupName = value;
    }
  }

  @action
  async getUserFromServe(obj) {
    const response = await Api.get("users");
    const status = response.status;
    if (status === 200) {
      const json = await response.json();
      this.users = json.filter(e => e.id !== user.info.id);
    }
  }

  @action
  async newChat(e) {
    const data = [...e, toJS(user.info)];
    const response = await Api.post("chat/new", { data: data });
    const status = response.status;
    if (status === 200) {
      const json = await response.json();

      const other =
        json.data[1].id === user.info.id ? json.data[0] : json.data[1];
      chat.setIdAndUser(json.id, other);
    }
    this.done = true;
  }
  @action
  async newGroup() {
    if (this.groupName.length === 0) {
      swal("Error", "Pleass Enter Group Name", "error");
      return;
    } else if (this.usersSelect.length < 2) {
      swal("Error", "Group most have tow member at lest", "error");
      return;
    }
    const members = [...this.usersSelect, toJS(user.info)];
    const data = { name: this.groupName, members };
    const response = await Api.post("chat/new", {
      data
    });
    console.log(data);
    const status = response.status;
    if (status === 200) {
      const json = await response.json();
      console.log(json);
      this.done = true;
      // const other =
      //   json.data[1].id === user.info.id ? json.data[0] : json.data[1];
      // chat.setIdAndUser(json.id, other);
    }
  }

  @computed
  get SearchForUsersValue() {
    return this.users.filter(item => item.name.startsWith(this.search));
  }

  @action
  selectUser(obj) {
    this.usersSelect.push(obj);
    this.users = this.users.filter(e => e.id != obj.id);
  }
  @action
  UnselectUser(obj) {
    this.users.push(obj);
    this.usersSelect = this.usersSelect.filter(e => e.id != obj.id);
  }
}
const userStore = new UserStore();

export default userStore;
