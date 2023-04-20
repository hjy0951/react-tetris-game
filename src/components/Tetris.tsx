import React from "react";
// util
import { createStage } from "../util/gameHelper";
// Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

const Tetris = () => {
  return (
    <div>
      <Stage stage={createStage()} />
      <div>
        <div>
          <Display text="Score" />
          <Display text="Rows" />
          <Display text="Level" />
        </div>
        <StartButton />
      </div>
    </div>
  );
};

export default Tetris;
