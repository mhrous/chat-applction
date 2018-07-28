import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { observer } from "mobx-react";

import { chat, allEmoje } from "../../data";

import "./style.css";

const actions = [
  <FlatButton
    label="Cancel"
    primary={true}
    onClick={() => chat.handleCloseModel({ type: "emoji" })}
  />
];
const ModelChangeEmoji = () => (
  <div>
    <Dialog
      title="Pick an emoji for this conversation"
      actions={actions}
      modal={false}
      open={chat.openModelChangeEmoji}
      contentStyle={{ padding: "24px", width: "400px" }}
      titleStyle={{ paddingBottom: "0px", fontSize: "18px" }}
      bodyStyle={{ paddingBottom: "0px" }}
    >
      Everyone in this conversation will see this.
      <div id="emoji-content">
        {allEmoje.map(e => (
          <i
            className={`twa twa-${e}`}
            key={e}
            onClick={() => chat.handleCloseModel({ type: "emoji", data: e })}
          />
        ))}
      </div>
    </Dialog>
  </div>
);

export default observer(ModelChangeEmoji);
