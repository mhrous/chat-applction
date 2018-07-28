import React from "react";
import Popover from "material-ui/Popover";
import { observer } from "mobx-react";

import { chat, allEmoje } from "../../data";

import "./style.css";

const AddEmojiPopover = () => (
  <div id="add-emoji-popover">
    <Popover
      open={chat.addEmoji}
      anchorEl={chat.addEmojiNode}
      anchorOrigin={{ horizontal: "middle", vertical: "top" }}
      targetOrigin={{ horizontal: "middle", vertical: "bottom" }}
      onRequestClose={() => chat.handleClosePopover({ type: "emoji" })}
    >
      <div style={{ paddingTop: "20px" }}>
        <div id="emoji-content">
          {allEmoje.map(e => (
            <i
              className={`twa twa-${e}`}
              key={e}
              onClick={() =>
                chat.handleClosePopover({ type: "emoji", data: e })
              }
            />
          ))}
        </div>
      </div>
    </Popover>
  </div>
);

export default observer(AddEmojiPopover);
