import React from "react";
// style
import { TetrisCell } from "./styles/CellStyle";
// util
import { TETROMINOS, TetrominoType } from "../util/tetrominos";

interface CellProps {
  type: TetrominoType;
}

const Cell = ({ type }: CellProps) => {
  return <TetrisCell type={type} color={TETROMINOS[type].color} />;
};

export default React.memo(Cell);
