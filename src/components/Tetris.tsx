import React, { useState } from "react";
// components
import Stage, { StageFormat } from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
// style
import { TetrisWrapper, TetrisContainer } from "./styles/TetrisStyle";
// hooks
import { useStage } from "../hooks/useStage";

const Tetris = () => {
  const [gameOver] = useState(false);

  const [stage] = useStage();

  console.log("Rendering!"); // 리렌더링 확인을 위한 로그
  return (
    <TetrisWrapper>
      <TetrisContainer>
        <Stage stage={stage as StageFormat} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton />
        </aside>
      </TetrisContainer>
    </TetrisWrapper>
  );
};

export default Tetris;
