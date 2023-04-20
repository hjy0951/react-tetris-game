import React from "react";
// util
import { createStage } from "../util/gameHelper";
// Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
// style
import { TetrisWrapper, TetrisContainer } from "./styles/TetrisStyle";

const Tetris = () => {
  return (
    <TetrisWrapper>
      <TetrisContainer>
        <Stage stage={createStage()} />
        <aside>
          <div>
            <Display text="Score" />
            <Display text="Rows" />
            <Display text="Level" />
          </div>
          <StartButton />
        </aside>
      </TetrisContainer>
    </TetrisWrapper>
  );
};

export default Tetris;
