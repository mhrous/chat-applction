import React, { Component } from "react";
import { observer } from "mobx-react";
import { Redirect } from "react-router-dom";

import { chat, user, game } from "../../data";
import { LeftChatBar, ChatContent, ModelAskGame, Game } from "../../views";
import socket from "../../lib/socket";

import "./style.css";

@observer
class Chat extends Component {
  scrollToBottom = () => {
    if (this.messagesBox) {
      this.refs.messagesBox.scrollIntoView(false, { behavior: "smooth" });
    }
  };

  componentDidMount() {
    if (user.info) {
      socket.run(user.info.id);

      chat.getChatList();
      this.scrollToBottom();
    }
  }

  componentWillUnmount() {
    chat.end();
    chat.clear();
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    if (!user.info) {
      return <Redirect to="/" />;
    }

    return (
      <div id="chat">
        <ModelAskGame />
        <LeftChatBar />
        {game.play && <Game />}

        {chat.id ? (
          <ChatContent />
        ) : (
          <div className="select-chat-please">Please select a conversation</div>
        )}
      </div>
    );
  }
}

export default Chat;
