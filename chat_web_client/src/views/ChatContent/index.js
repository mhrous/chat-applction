import React from "react";
import { observer } from "mobx-react";
import ChatContentLeftBart from "./ChatContentLeftBart";
import ChatContentRightBart from "./ChatContentRightBart";
import { chat, time } from "../../data";

import "./style.css";

const ChatContent = () => (
  <div id="chat-content">
    <div className="header">
      {chat.user ? (
        <div>
          {console.log(chat.user, 555555555)}
          <div className="user-name">{chat.user && chat.user.name}</div>
          <div className="time-active">
            {chat.user && time.time[chat.user.id]}
          </div>
        </div>
      ) : (
        <div>{chat.groupData.name}</div>
      )}
    </div>
    <div className="body">
      <ChatContentLeftBart />
      <ChatContentRightBart />
    </div>
  </div>
);

export default observer(ChatContent);
