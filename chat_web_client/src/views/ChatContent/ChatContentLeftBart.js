import React, { Component } from "react";
import { observer } from "mobx-react";
import { chat } from "../../data";
import ModelSearchCaht from "../ModelSearchCaht";
import TextFieldChat from "./TextFieldChat";
import Message from "./Message.";

import "./style.css";

@observer
class ChatContentLeftBart extends Component {
  scrollToBottom = () => {
    this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  render() {
    return (
      <div id="chat-content-left-bart">
        <div className="body" color={chat.colorSelect}>
          <div
            className="messege-container"
            ref={el => {
              this.messagesEnd = el;
            }}
          >
            {chat.openModelSearch && <ModelSearchCaht />}

            {chat.messages.map(e => (
              <Message
                key={e.id}
                text={e.text}
                m_user={e.user}
                type={e.type}
                name={e.name}
                path={e.path}
              />
            ))}
          </div>
        </div>
        <div className="footer">
          <TextFieldChat />
        </div>
      </div>
    );
  }
}

export default ChatContentLeftBart;
