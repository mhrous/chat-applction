import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { observer } from "mobx-react";

import { game } from "../../../data";

import "../style.css";

const actions = [
  <FlatButton
    label="No"
    secondary={true}
    onClick={() => game.rejectGame("I heat you")}
  />,
  <FlatButton label="yse" primary={true} onClick={() => game.acceptGame()} />
];
const ModelAskGame = () => (
  <div>
    <Dialog
      title="XO GAME"
      actions={actions}
      modal={false}
      open={game.openModelAskGame}
      contentStyle={{ padding: "24px", width: "400px" }}
      titleStyle={{ paddingBottom: "0px", fontSize: "18px" }}
      bodyStyle={{ paddingBottom: "0px" }}
    >
      {game.player && <div>do you want play with {game.player.name}</div>}
    </Dialog>
  </div>
);

export default observer(ModelAskGame);
