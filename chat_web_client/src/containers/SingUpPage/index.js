import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { observer } from "mobx-react";

import { user, singUpPageStore } from "../../data";

import { SigUpForm, SvgBackround } from "../../views";
import "./style.css";
import img from "./user.png";

@observer
class SingUpPage extends Component {
  componentDidMount() {
    singUpPageStore.reset();
  }
  render() {
    if (user.info) {
      return <Redirect to="chat" />;
    }
    return (
      <div id="sing-up-bage">
        <SvgBackround />
        <div id="sing-up">
          <img src={img} alt="user" />
          <SigUpForm />
          <div className="footer">
            <Link to="/">Log In </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SingUpPage;
