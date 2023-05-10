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
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";

const Tetris = () => {
  const [gameOver, setGameOver] = useState(false);
  const [dropTime, setDropTime] = useState<number | null>(null);

  const [player, updatePlayerPos, resetPlayer, rotatePlayer] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);

  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);

  console.log("Rendering!"); // 리렌더링 확인을 위한 로그

  const startGame = () => {
    // Reset Everything
    setStage(createStage() as StageFormat);
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(1);
  };

  const drop = () => {
    // 10개의 행이 정리될 때마다 level up & 속도 증가
    if (rows > level * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(850 + level * 150);
    }

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

  const downKeyUp = ({ key }: KeyboardEvent<HTMLDivElement>) => {
    if (!gameOver) {
      if (key === "ArrowDown") {
        setDropTime(850 + level * 150);
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
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

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <TetrisWrapper role="button" onKeyDown={(e) => move(e)} onKeyUp={downKeyUp}>
      <TetrisContainer>
        <Stage stage={stage as StageFormat} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton onClickFn={startGame} />
        </aside>
      </TetrisContainer>
    </TetrisWrapper>
  );
};

export default Tetris;
