import React from "react";

import { observer } from "mobx-react";
import AddEmojiPopover from "./AddEmojiPopover";

import { chat, time, game } from "../../data";

import "./style.css";

const TextFieldChat = () => (
  <div>
    {chat.block ? (
      <div className="block-messages">{chat.blockMessages}</div>
    ) : (
      <div id="text-field-chat">
        <AddEmojiPopover />
        <div className="input">
          <textarea
            wrap="soft"
            onChange={e => chat.handleChange(e)}
            name="text"
            value={chat.text}
            className="input"
            placeholder="Type a message..."
            onKeyPress={e => chat.handleKeyPress(e)}
          />
        </div>
        <div className="icon">
          <div className="shear-file">
            <label htmlFor="file" />
            <input type="file" id="file" onChange={e => chat.fileUpload(e)} />
          </div>
          <div
            className="add-emoji"
            onClick={e => chat.handleOpenPopover(e, "emoji")}
          >
            <label />
          </div>
          <div
            className={chat.startRecord ? "recordPlay" : "record"}
            onClick={() => chat.Record()}
          >
            <label />
          </div>
          {chat.groupData == null &&
            time.time[chat.user.id] === "online" && (
              <div className="play" onClick={() => game.askUserToPlay()}>
                <label />
              </div>
            )}
          <div>
            {!chat.text.length ? (
              <i
                className={`twa twa-${chat.emojiSelect}`}
                style={{ height: "1.5em", marginTop: ".3em" }}
                onClick={() => {
                  chat.text += `<i class="twa twa-${chat.emojiSelect}"></i>`;
                  chat.send();
                }}
              />
            ) : (
              <button className="send-btn " onClick={e => chat.send(e)}>
                Send
              </button>
            )}
          </div>
        </div>
      </div>
    )}
  </div>
);

export default observer(TextFieldChat);
