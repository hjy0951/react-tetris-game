import React, { KeyboardEvent, useState } from "react";
// components
import Stage, { StageFormat } from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
// style
import { TetrisWrapper, TetrisContainer } from "./styles/TetrisStyle";
// util
import { createStage } from "../util/gameHelper";
// hooks
import { useStage } from "../hooks/useStage";
import { usePlayer } from "../hooks/usePlayer";

const Tetris = () => {
  const [gameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log("Rendering!"); // 리렌더링 확인을 위한 로그

  const startGame = () => {
    // Reset Everything
    setStage(createStage() as StageFormat);
    resetPlayer();
  };

  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false });
  };

  const dropPlayer = () => {
    drop();
  };

  const movePlayer = (dir: number) => {
    updatePlayerPos({ x: dir, y: 0, collided: false });
  };

  const move = ({ key }: KeyboardEvent<HTMLDivElement>) => {
    if (!gameOver) {
      if (key === "ArrowLeft") {
        movePlayer(-1);
      } else if (key === "ArrowRight") {
        movePlayer(1);
      } else if (key === "ArrowDown") {
        dropPlayer();
      } else if (key === "ArrowUp") {
        // rotate tetromino
      }
    }
  };

  return (
    <TetrisWrapper role="button" onKeyDown={(e) => move(e)}>
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
          <StartButton onClickFn={startGame} />
        </aside>
      </TetrisContainer>
    </TetrisWrapper>
  );
};

export default Tetris;
