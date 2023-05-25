import React from "react";
// style
import { TetrisCell } from "./styles/CellStyle";
// util
import { TetrominoType, pickTetromino } from "../util/tetrominos";

interface CellProps {
  type: TetrominoType;
}

const Cell = ({ type }: CellProps) => {
  return <TetrisCell type={type} color={pickTetromino(type).color} />;
};

export default React.memo(Cell);
