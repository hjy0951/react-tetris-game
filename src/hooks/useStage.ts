import { Dispatch, SetStateAction, useState, useEffect } from "react";
// components
import { StageFormat } from "../components/Stage";
// util
import { createStage } from "../util/gameHelper";
import { TetrominoType } from "../util/tetrominos";
// hooks
import { PlayerState } from "./usePlayer";

/*
현재 테트리스 게임판의 상태를 저장하기 위한 hook
*/

export const useStage = (
  player: PlayerState,
  resetPlayer: () => void
): [StageFormat, Dispatch<SetStateAction<StageFormat>>] => {
  const [stage, setStage] = useState<StageFormat>(createStage());

  useEffect(() => {
    const updateStage = (prevStage: StageFormat): StageFormat => {
      // 현재 Stage를 그림
      const newStage: StageFormat = prevStage.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      // 사용자가 조작하는 테트리스 블록을 그림
      player.tetromino.forEach((row, y: number) => {
        row.forEach((value: TetrominoType, x: number) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });

      if (player.collided) {
        resetPlayer();
      }

      return newStage;
    };

    setStage((prev: StageFormat) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage];
};
