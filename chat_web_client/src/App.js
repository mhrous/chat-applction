import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Chat, UsersPage, SingUpPage, SingInPage } from "./containers";

import { user } from "./data";

import { LeftChatBar } from "./views";

user.setInfo(JSON.parse(localStorage.getItem("chat")));
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SingInPage} />
        <Route path="/sing-up" exact component={SingUpPage} />
        <Route path="/chat" exact component={Chat} />
        <Route path="/user" exact component={UsersPage} />
        <Route path="/test" exact component={LeftChatBar} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
