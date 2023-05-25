import React, { KeyboardEvent, useState } from "react";
// components
import Stage, { StageFormat } from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import Block from "./BlockView";
// style
import { TetrisWrapper, TetrisContainer } from "./styles/TetrisStyle";
// util
import { checkCollision, createStage } from "../util/gameHelper";
import { pickRandomTetrominoType, pickTetromino } from "../util/tetrominos";
// hooks
import { useStage } from "../hooks/useStage";
import { usePlayer } from "../hooks/usePlayer";
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";
// recoil
import { useRecoilState } from "recoil";
import { savedBlockState, nextBlockState } from "../recoil/atoms";

const Tetris = () => {
  const [gameOver, setGameOver] = useState(false);
  const [dropTime, setDropTime] = useState<number | null>(null);

  const [
    player,
    updatePlayerPos,
    initPlayer,
    resetPlayer,
    changePlayer,
    rotatePlayer,
  ] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);

  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);

  const [nextBlockType, setNextBlockType] = useRecoilState(nextBlockState);
  const [savedBlockType, setSavedBlockType] = useRecoilState(savedBlockState);

  console.log("Rendering!"); // 리렌더링 확인을 위한 로그

  const startGame = () => {
    // Reset Everything
    setStage(createStage() as StageFormat);
    setDropTime(500);
    initPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(1);
    setNextBlockType(pickRandomTetrominoType());
    setSavedBlockType(0);
  };

  const softDrop = () => {
    // 10개의 행이 정리될 때마다 level up & 속도 증가
    if (rows > level * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / (level + 1));
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

  const hardDrop = () => {
    let height = 1;
    while (!checkCollision(player, stage, { x: 0, y: height })) {
      height++;
    }

    updatePlayerPos({ x: 0, y: height - 1, collided: true });
  };

  const downKeyUp = ({ key }: KeyboardEvent<HTMLDivElement>) => {
    if (!gameOver) {
      if (key === "ArrowDown") {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    softDrop();
  };

  const movePlayer = (dir: number) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  };

  const savePlayer = () => {
    const currentSavedType = savedBlockType;
    // 저장되어있는 타입이 없는 경우 -> 타입 저장 후, 다음 블록 타입으로 진행
    // 저장되어있는 타입이 있는 경우 -> 저장되어있는 타입을 불러오고, 현재 타입 저장
    setSavedBlockType(player.type);
    if (currentSavedType === 0) resetPlayer();
    else changePlayer();
  };

  const move = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!gameOver) {
      if (event.key === "ArrowLeft") {
        movePlayer(-1);
      } else if (event.key === "ArrowRight") {
        movePlayer(1);
      } else if (event.key === "ArrowDown") {
        dropPlayer();
      } else if (event.key === "ArrowUp") {
        rotatePlayer(stage, 1);
      } else if (event.key === " ") {
        event.preventDefault();
        console.log("press SpaceBar");
        hardDrop();
      } else if (event.key === "c") {
        console.log("press C");
        savePlayer();
      }
    }
  };

  useInterval(() => {
    softDrop();
  }, dropTime);

  return (
    <TetrisWrapper role="button" onKeyDown={(e) => move(e)} onKeyUp={downKeyUp}>
      <TetrisContainer>
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
          <Block tetromino={pickTetromino(nextBlockType)} />
        </aside>
        <Stage stage={stage as StageFormat} />
        <aside>
          <Block tetromino={pickTetromino(savedBlockType)} />
        </aside>
      </TetrisContainer>
    </TetrisWrapper>
  );
};

export default Tetris;
