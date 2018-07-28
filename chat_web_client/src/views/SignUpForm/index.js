import React from "react";
import TextField from "material-ui/TextField";
import { observer } from "mobx-react";
import RaisedButton from "material-ui/RaisedButton";
import { singUpPageStore } from "../../data";
import "./style.css";

const SigUpForm = () => (
  <form id="sing-up-form" onSubmit={e => singUpPageStore.handleSubmit(e)}>
    <TextField
      value={singUpPageStore.name}
      onChange={e => singUpPageStore.handleChange(e)}
      name="name"
      fullWidth={true}
      hintText="enter name"
      required
    />
    <TextField
      value={singUpPageStore.email}
      onChange={e => singUpPageStore.handleChange(e)}
      name="email"
      type="email"
      fullWidth={true}
      hintText="enter email"
      required
      errorText={singUpPageStore.emailError}
    />
    <TextField
      value={singUpPageStore.password}
      fullWidth={true}
      name="password"
      onChange={e => singUpPageStore.handleChange(e)}
      hintText="pasword"
      type="password"
      required
      errorText={singUpPageStore.passwordError}
    />
    <RaisedButton
      className="btn-sing-up"
      label="sing up"
      primary={true}
      type="submit"
    />
  </form>
);

export default observer(SigUpForm);
