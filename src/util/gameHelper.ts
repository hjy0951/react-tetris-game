import { StageFormat } from "../components/Stage";
import { PlayerState, Position } from "../hooks/usePlayer";

// stage 생성
export const STAGE_HEIGHT = 20;
export const STAGE_WIDTH = 12;

export const createStage = (): StageFormat => {
  return Array.from({ length: STAGE_HEIGHT }, () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );
};

export const checkCollision = (
  player: PlayerState,
  stage: StageFormat,
  { x: moveX, y: moveY }: Position
) => {
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[y].length; x++) {
      // cell 단위로 충돌 검사
      if (player.tetromino[y][x] !== 0) {
        const ny = y + player.pos.y + moveY;
        const nx = x + player.pos.x + moveX;

        if (
          !stage[ny] || // Y축 범위를 벗어난 경우
          !stage[ny][nx] || // X축 범위를 벗어난 경우
          stage[ny][nx][1] !== "clear" // 비어있는 cell이 아닌 경우
        ) {
          return true;
        }
      }
    }
  }
  return false;
};
