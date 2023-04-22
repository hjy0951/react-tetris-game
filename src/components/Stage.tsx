import React from "react";
// components
import Cell from "./Cell";
// style
import { TetrisStage } from "./styles/StageStyle";
// util
import { TetrominoType } from "../util/tetrominos";

export type StageFormat = Array<Array<Array<TetrominoType | string>>>;

interface StageProps {
  stage: StageFormat;
}

/*
Cell의 key
: Cell의 순서가 바뀌지 않고 인덱스가 변하지 않기 때문에
  map 처리 순서를 계산하여 사용
*/

const Stage = ({ stage }: StageProps) => {
  return (
    <TetrisStage width={stage[0].length} height={stage.length}>
      {stage.map((rows: Array<Array<TetrominoType | string>>, y: number) =>
        rows.map((cell: Array<TetrominoType | string>, x: number) => {
          return (
            <Cell key={y * rows.length + x} type={cell[0] as TetrominoType} />
          );
        })
      )}
    </TetrisStage>
  );
};

export default Stage;
