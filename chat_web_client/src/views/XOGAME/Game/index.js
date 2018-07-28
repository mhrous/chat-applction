import React from "react";

import { observer } from "mobx-react";
import X from "./X";
import O from "./O";

import { game } from "../../../data";

import "../style.css";

const Game = () => (
  <div className="xo-game-container">
    <div className="game">
      <div className="board">
        <svg className="board__line" style={{ "--x": 1, "--y": 0 }}>
          <path
            d="M 5 5 L 210 5"
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="300"
            strokeDashoffset="300"
          />
        </svg>
        <svg className="board__line" style={{ "--x": 2, "--y": 0 }}>
          <path
            d="M 5 5 L 210 5"
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="300"
            strokeDashoffset="300"
          />
        </svg>
        <svg className="board__line" style={{ "--x": 0, "--y": 1 }}>
          <path
            d="M 5 5 L 210 5"
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="300"
            strokeDashoffset="300"
          />
        </svg>
        <svg className="board__line" style={{ "--x": 0, "--y": 2 }}>
          <path
            d="M 5 5 L 210 5"
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="300"
            strokeDashoffset="300"
          />
        </svg>
        {game.move.map((e, index) => {
          switch (e) {
            case "x":
              return (
                <X key={index} col={index % 3} row={Math.floor(index / 3)} />
              );
            case "o":
              return (
                <O key={index} col={index % 3} row={Math.floor(index / 3)} />
              );

            default:
              break;
          }
        })}
        <button onClick={() => game._play(0)} />
        <button onClick={() => game._play(1)} />

        <button onClick={() => game._play(2)} />

        <button onClick={() => game._play(3)} />

        <button onClick={() => game._play(4)} />
        <button onClick={() => game._play(5)} />

        <button onClick={() => game._play(6)} />
        <button onClick={() => game._play(7)} />
        <button onClick={() => game._play(8)} />
      </div>
    </div>
  </div>
);

export default observer(Game);
