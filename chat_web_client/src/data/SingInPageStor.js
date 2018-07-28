import { observable, action } from "mobx";
import Api from "../lib/api";
import user from "./user";
import { logInLocal } from "../lib";

class SingInPageStore {
  @observable email = "";
  @observable password = "";
  @observable emailError = "";
  @observable passwordError = "";

  @action
  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    if (value === " ") return;
    switch (name) {
      case "email":
        this.email = value;
        this.emailError = "";
        break;
      case "password":
        this.password = value;
        this.passwordError = "";
        break;
      default:
        return;
    }
  }

  @action
  reset() {
    this.email = "";
    this.password = "";
    this.emailError = "";
    this.passwordError = "";
  }

  @action
  async handleSubmit(e) {
    e.preventDefault();
    const email = this.email;
    const password = this.password;
    const obj = {
      email,
      password
    };
    await this.logIn(obj);
  }

  @action
  async logIn(obj) {
    const response = await Api.post("login", { user: obj });
    const status = response.status;
    if (status === 200) {
      const json = await response.json();
      this.emailError = json.emailError;
      this.passwordError = json.passwordError;
      if (json.id) {
        user.setInfo(json);
        logInLocal(json);
      }
    }
  }
}

const singInPageStore = new SingInPageStore();

export default singInPageStore;
