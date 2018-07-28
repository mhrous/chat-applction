import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { observer } from "mobx-react";
import Done from "material-ui/svg-icons/action/done";

import { chat, colorConversation } from "../../data";

import "./style.css";

const actions = [
  <FlatButton
    label="Cancel"
    primary={true}
    onClick={() => chat.handleCloseModel({ type: "color" })}
  />
];
const ModelChangeColor = () => (
  <div>
    <Dialog
      title="Pick a color for this conversation"
      actions={actions}
      modal={false}
      open={chat.openModelChangeColor}
      contentStyle={{ padding: "24px", width: "400px" }}
      titleStyle={{ paddingBottom: "0px", fontSize: "18px" }}
      bodyStyle={{ paddingBottom: "0px" }}
    >
      Everyone in this conversation will see this.
      <div id="color-content">
        {colorConversation.map(e => (
          <div
            key={e}
            style={{ backgroundColor: e }}
            id="color"
            onClick={() => chat.handleCloseModel({ type: "color", data: e })}
          >
            {chat.colorSelect === e && (
              <Done
                style={{
                  color: "#fff",
                  marginLeft: "15px",
                  marginTop: "13px"
                }}
              />
            )}
          </div>
        ))}
      </div>
    </Dialog>
  </div>
);

export default observer(ModelChangeColor);
