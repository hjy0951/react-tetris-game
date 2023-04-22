import { useCallback, useState } from "react";
// util
import { TetrominoShape, pickRandomTetromino } from "../util/tetrominos";
import { STAGE_WIDTH } from "../util/gameHelper";

interface Position {
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
  resetPlayer: () => void
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

  return [player, updatePlayerPos, resetPlayer];
};
