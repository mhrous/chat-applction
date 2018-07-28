import React from "react";
import TextField from "material-ui/TextField";
import { observer } from "mobx-react";
import RaisedButton from "material-ui/RaisedButton";
import { singInPageStore } from "../../data";
import "./style.css";

const SigInForm = () => (
  <form id="sing-in-form" onSubmit={e => singInPageStore.handleSubmit(e)}>
    <TextField
      value={singInPageStore.email}
      onChange={e => singInPageStore.handleChange(e)}
      name="email"
      fullWidth={true}
      hintText="enter email"
      errorText={singInPageStore.emailError}
      type="email"
      required
    />

    <TextField
      value={singInPageStore.password}
      fullWidth={true}
      name="password"
      onChange={e => singInPageStore.handleChange(e)}
      hintText="pasword"
      type="password"
      errorText={singInPageStore.passwordError}
      required
    />
    <RaisedButton
      className="btn-login"
      label="login"
      primary={true}
      type="submit"
    />
  </form>
);

export default observer(SigInForm);
