import { Dispatch, SetStateAction, useState, useEffect } from "react";
// components (이후에 type 정리 필요할듯)
import { StageFormat, StageLine } from "../components/Stage";
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
): [StageFormat, Dispatch<SetStateAction<StageFormat>>, number] => {
  const [stage, setStage] = useState<StageFormat>(createStage());
  const [rowsCleared, setRowsCleared] = useState<number>(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (newStage: StageFormat) => {
      // reduce를 이용해 stage를 정리하고 빈 배열부터 점점 채워나감
      return newStage.reduce((acc: StageFormat, row: StageLine) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          // 블록이 가득 찬 라인 count
          setRowsCleared((prev) => prev + 1);
          // stage의 가장 위에 빈 라인을 넣어 없앤 라인을 보충
          acc.unshift(new Array(newStage[0].length).fill([0, "clear"]));
          return acc;
        }
        acc.push(row);
        return acc;
      }, []);
    };

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
        return sweepRows(newStage); // 정리할 라인이 있는지 확인
      }

      return newStage;
    };

    setStage((prev: StageFormat) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};
