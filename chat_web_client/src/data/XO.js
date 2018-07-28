import { observable, action } from "mobx";
import socket from "../lib/socket";
import chat from "./chat";
import user from "./user";
import swal from "sweetalert";

class XO {
  @observable openModelAskGame = false;
  @observable player = null;
  @observable play = false;
  my = "";
  term = true;
  @observable move = [null, null, null, null, null, null, null, null, null];

  _play(pos) {
    if (!this.term || !this.player) return;
    console.log(this.player, user.info, 555555555);
    socket.sendMasseage({
      data: {
        my: this.my,
        pos
      },

      type: "play",
      id: [this.player.id, user.info.id]
    });
  }

  testResult() {
    if (
      (this.move[0] === "x" && this.move[1] === "x" && this.move[2] === "x") ||
      (this.move[3] === "x" && this.move[4] === "x" && this.move[5] === "x") ||
      (this.move[6] === "x" && this.move[7] === "x" && this.move[8] === "x") ||
      (this.move[0] === "x" && this.move[3] === "x" && this.move[6] === "x") ||
      (this.move[1] === "x" && this.move[4] === "x" && this.move[7] === "x") ||
      (this.move[2] === "x" && this.move[5] === "x" && this.move[8] === "x") ||
      (this.move[0] === "x" && this.move[4] === "x" && this.move[8] === "x") ||
      (this.move[2] === "x" && this.move[4] === "x" && this.move[6] === "x")
    ) {
      if (this.my === "x") swal("Sucsess", " you win");
      else swal("Error", " you lose");
      this.clear();
    } else if (
      (this.move[0] === "o" && this.move[1] === "o" && this.move[2] === "o") ||
      (this.move[3] === "o" && this.move[4] === "o" && this.move[5] === "o") ||
      (this.move[6] === "o" && this.move[7] === "o" && this.move[8] === "o") ||
      (this.move[0] === "o" && this.move[3] === "o" && this.move[6] === "o") ||
      (this.move[1] === "o" && this.move[4] === "o" && this.move[7] === "o") ||
      (this.move[2] === "o" && this.move[5] === "o" && this.move[8] === "o") ||
      (this.move[0] === "o" && this.move[4] === "o" && this.move[8] === "o") ||
      (this.move[2] === "o" && this.move[4] === "o" && this.move[6] === "o")
    ) {
      if (this.my === "o") swal(" you win", "sucsess");
      else swal(" you lose", "error");
      this.clear();
    } else if (
      this.move[0] &&
      this.move[1] &&
      this.move[2] &&
      this.move[3] &&
      this.move[4] &&
      this.move[5] &&
      this.move[6] &&
      this.move[7] &&
      this.move[8]
    ) {
      this.clear();
      swal("x  o", "error");
    }
  }

  @action
  clear() {
    this.openModelAskGame = false;
    this.player = null;
    this.play = false;
    this.my = "";
    this.term = true;
    this.move = [null, null, null, null, null, null, null, null, null];
  }
  @action
  askUserToPlay() {
    if (this.player) {
      swal("Error", "يا حمار ما فيك تلعب مع تنين بنفس الوقت", "error");
      return;
    }
    const { name, color, id } = user.info;
    socket.sendMasseage({
      data: {
        user: {
          name,
          color,
          id
        }
      },
      type: "askToPlay",
      id: [chat.user.id]
    });
  }

  @action
  acceptGame() {
    this.openModelAskGame = false;
    this.play = true;
    this.my = "o";
    this.term = false;

    const { name, color, id } = user.info;
    socket.sendMasseage({
      data: {
        user: {
          name,
          color,
          id
        }
      },

      type: "yesPlay",
      id: [this.player.id]
    });
  }

  @action
  rejectGame(m) {
    socket.sendMasseage({
      data: {
        m
      },
      type: "noPlay",
      id: [this.player.id]
    });
    this.clear();
  }
}
const game = new XO();

export default game;
