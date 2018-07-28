import { observable, action } from "mobx";
import user from "./user";

import Api from "../lib/api";
import { randomColor, logInLocal } from "../lib";

class SingUpPageStore {
  @observable name = "";
  @observable password = "";
  @observable email = "";
  @observable emailError = "";
  @observable passwordError = "";

  @action
  reset() {
    this.name = "";
    this.password = "";
    this.email = "";
    this.emailError = "";
    this.passwordError = "";
  }

  @action
  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    if (value === " ") return;
    switch (name) {
      case "name":
        this.name = value;
        break;
      case "password":
        this.password = value;
        this.passwordError = "";
        break;
      case "email":
        this.email = value;
        this.emailError = "";
        break;
      default:
        return;
    }
  }

  @action
  handleSubmit(e) {
    e.preventDefault();
    const name = this.name;
    const password = this.password;
    const email = this.email;
    const obj = {
      name,
      password,
      email,
      color: randomColor()
    };
    this.signUp(obj);
  }

  @action
  async signUp(obj) {
    const response = await Api.post("register", { user: obj });
    const status = response.status;
    if (status === 200) {
      const json = await response.json();
      this.emailError = json.emailError;
      this.passwordError = json.passwordLengthError;

      if (json.id) {
        user.setInfo(json);
        logInLocal(json);
      }
    }
  }
}

const singUpPageStore = new SingUpPageStore();

export default singUpPageStore;
