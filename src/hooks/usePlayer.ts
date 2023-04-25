import { useCallback, useState } from "react";
// util
import { TetrominoShape, pickRandomTetromino } from "../util/tetrominos";
import { STAGE_WIDTH } from "../util/gameHelper";
// type (interface, type들에 대한 파일 분리가 필요할듯)
import { StageFormat } from "../components/Stage";

export interface Position {
  x: number;
  y: number;
}

export interface PlayerState {
  pos: Position;
  tetromino: TetrominoShape;
  collided: boolean;
}

interface PositionUpdateProps {
  x: number;
  y: number;
  collided: boolean;
}

/*
사용자가 움직일 테트리스 블록의 위치, 블록 타입, 충돌 검사 정보를 갖는 객체를 상태로 저장하기 위한 hook
*/

export const usePlayer = (): [
  player: PlayerState,
  updatePlayerPos: (data: PositionUpdateProps) => void,
  resetPlayer: () => void,
  rotatePlayer: (stage: StageFormat, dir: number) => void
] => {
  const [player, setPlayer] = useState<PlayerState>({
    pos: { x: 0, y: 0 },
    tetromino: pickRandomTetromino().shape,
    collided: false,
  });

  const updatePlayerPos = ({ x, y, collided }: PositionUpdateProps) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    const initialPlayer = {
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: pickRandomTetromino().shape,
      collided: false,
    };
    setPlayer(initialPlayer);
  }, []);

  // 행렬 회전 (dir === 1 : 시계 방향, dir을 달리하여 반시계 등 다른 기능 추가 가능하도록)
  //  참고: https://www.qu3vipon.com/python-rotate-2d-array
  const rotate = (matrix: TetrominoShape, dir: number) => {
    // Transpose
    const transposeTetrominoMatrix = matrix.map((_, idx) => {
      return matrix.map((col) => col[idx]);
    });
    // Reverse
    if (dir > 0) return transposeTetrominoMatrix.map((row) => row.reverse());
    return transposeTetrominoMatrix.reverse();
  };

  const rotatePlayer = (stage: StageFormat, dir: number) => {
    const newPlayer = JSON.parse(JSON.stringify(player));
    newPlayer.tetromino = rotate(newPlayer.tetromino, dir);

    setPlayer(newPlayer);
  };

  return [player, updatePlayerPos, resetPlayer, rotatePlayer];
};
