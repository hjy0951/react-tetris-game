import React, { KeyboardEvent, useState } from "react";
// components
import Stage, { StageFormat } from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
// style
import { TetrisWrapper, TetrisContainer } from "./styles/TetrisStyle";
// util
import { checkCollision, createStage } from "../util/gameHelper";
// hooks
import { useStage } from "../hooks/useStage";
import { usePlayer } from "../hooks/usePlayer";

const Tetris = () => {
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, rotatePlayer] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log("Rendering!"); // 리렌더링 확인을 위한 로그

  const startGame = () => {
    // Reset Everything
    setStage(createStage() as StageFormat);
    resetPlayer();
    setGameOver(false);
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // 더이상 블록이 내려올 수 없는 상태로 게임 종료
      if (player.pos.y < 1) {
        console.log("Game Over!");
        setGameOver(true);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    drop();
  };

  const movePlayer = (dir: number) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
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
        rotatePlayer(stage, 1);
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
