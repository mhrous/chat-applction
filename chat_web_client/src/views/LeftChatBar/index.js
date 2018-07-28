import React from "react";
import { observer } from "mobx-react";
import ListItem from "material-ui/List/ListItem";
import { Link } from "react-router-dom";
import List from "material-ui/List/List";
import Avatar from "material-ui/Avatar";

import ContentAdd from "material-ui/svg-icons/content/add";
import { chat, user, time } from "../../data";
import User from "../User";
import src from "../../assets/group.png";

import "./style.css";

const LeftChatBar = () => (
  <div id="left-chat-bar">
    <div className="header">
      <Link
        to="/chat"
        className="user-settings"
        onClick={() => chat.logOut()}
      />
      <div className="title">Messenger</div>
      <Link to="/user">
        <ContentAdd color={"#0098ff"} style={{ marginTop: "6px" }} />
      </Link>
    </div>
    <div className="body">
      <div className="search-messenger">
        <label>
          <input
            type="text"
            className="search-for-a-chat-input"
            placeholder="Search Messenger"
            name="searchForChat"
            onChange={e => chat.handleChange(e)}
            value={chat.searchForChat}
          />
        </label>
      </div>
      <div className="list-of-chat-user">
        <List>
          {chat.UserChatAfterSearch.map(item => {
            const other =
              item.data[1].id !== user.info.id ? item.data[1] : item.data[0];
            return (
              <div
                key={item.id}
                onClick={e => chat.setIdAndUser(item.id, other)}
                className={item.id === chat.id ? "chat-select" : ""}
              >
                <User
                  name={other.name}
                  color={other.color}
                  status={
                    time.time[other.id] === "online" ? "online" : "offline"
                  }
                  notification={chat.notification[item.id]}
                />
              </div>
            );
          })}

          {chat.UserChatGroupAfterSearch.map(item => (
            <div
              key={item.id}
              className={item.id === chat.id ? "chat-select" : ""}
              onClick={() => chat.setIdAndGroup(item.id, item.data)}
            >
              <ListItem
                leftAvatar={<Avatar src={src} size={40} />}
                disabled={true}
                hoverColor="rgba(0,0,0,0.05)"
              >
                {item.data.name}
                {chat.notification[item.id] !== undefined &&
                  chat.notification[item.id] !== 0 && (
                    <div className="notification">
                      {chat.notification[item.id]}
                    </div>
                  )}
              </ListItem>
            </div>
          ))}
        </List>
      </div>
    </div>
  </div>
);

export default observer(LeftChatBar);
