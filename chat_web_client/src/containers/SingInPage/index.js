import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { observer } from "mobx-react";

import { user, singInPageStore } from "../../data";
import { SigInForm, SvgBackround } from "../../views";
import "./style.css";
import img from "./user.png";

@observer
class SingInPage extends Component {
  componentDidMount() {
    singInPageStore.reset();
  }
  render() {
    if (user.info) {
      return <Redirect to="chat" />;
    }
    return (
      <div id="sing-in-bage">
        <SvgBackround />
        <div id="login">
          <img src={img} alt="user" />
          <SigInForm />
          <div className="footer">
            <Link to="/sing-up">create new acount </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SingInPage;
