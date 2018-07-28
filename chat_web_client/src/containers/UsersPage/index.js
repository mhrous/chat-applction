import React, { Component } from "react";
import TextField from "material-ui/TextField";
import List from "material-ui/List/List";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { Redirect, Link } from "react-router-dom";

import RaisedButton from "material-ui/RaisedButton";
import Toggle from "material-ui/Toggle";
import { User } from "../../views";
import { userStore, user, time } from "../../data";
import socket from "../../lib/socket";

import "./style.css";

@observer
class UsersPage extends Component {
  constructor(props) {
    super(props);
    userStore.getUserFromServe();
  }
  componentDidMount() {
    if (user.info) {
      socket.run(user.info.id);
      userStore.clear();
    }
  }
  componentWillUnmount() {
    userStore.clear();
  }

  renderUsers() {
    return userStore.SearchForUsersValue.map(item => (
      <div
        onClick={e => {
          !userStore.group
            ? userStore.newChat([toJS(item)])
            : userStore.selectUser(toJS(item));
        }}
        key={item.id}
      >
        <User
          name={item.name}
          color={item.color}
          status={time.time[item.id] === "online" ? "online" : "offline"}
        />
      </div>
    ));
  }

  render() {
    if (!user.info) {
      return <Redirect to="/" />;
    }
    if (userStore.done) {
      return <Redirect to="/chat" />;
    }
    const userShowe = this.renderUsers();
    return (
      <div>
        <Link to="chat" className="btn-back">
          <RaisedButton label="Back" primary={true} />
        </Link>
        <div id="users-page">
          <Toggle
            label="group"
            toggled={userStore.group}
            onToggle={() => userStore.groupToggle()}
            defaultToggled={true}
            style={{ width: "240px", margin: "0 auto" }}
          />

          <div className="all-and-select-user">
            <div className="all-user">
              <TextField
                hintText="Search on User"
                onChange={e => userStore.handleChange(e)}
                fullWidth={true}
                value={userStore.search}
                name="search"
              />
              <div className="content">
                <List>{userShowe}</List>
                {userShowe.length === 0 && (
                  <span className="no-users">There are no users</span>
                )}
              </div>
            </div>
            {userStore.group && (
              <div className="select-user">
                <TextField
                  hintText="groub name"
                  onChange={e => userStore.handleChange(e)}
                  fullWidth={true}
                  value={userStore.groupName}
                  name="name"
                />
                <div className="content">
                  <List>
                    {userStore.usersSelect.map(item => {
                      item = toJS(item);
                      return (
                        <div
                          onClick={e => userStore.UnselectUser(item)}
                          key={item.id}
                        >
                          <User
                            name={item.name}
                            color={item.color}
                            status={
                              time.time[item.id] === "online"
                                ? "online"
                                : "offline"
                            }
                          />
                        </div>
                      );
                    })}
                  </List>
                  {userStore.usersSelect.length === 0 && (
                    <span className="no-users">no users select</span>
                  )}
                </div>
              </div>
            )}
          </div>
          <div>
            {userStore.group && (
              <RaisedButton
                label="Create Grobe"
                primary={true}
                style={{ float: "right" }}
                onClick={() => userStore.newGroup()}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default UsersPage;
