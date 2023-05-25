import React from "react";
// components
import Cell from "./Cell";
// style
import { Block } from "./styles/BlockViewStyle";
// util
import { TetrominoProps, TetrominoType } from "../util/tetrominos";
import { createPaddedTetromino } from "../util/gameHelper";

interface BlockViewProps {
  tetromino: TetrominoProps;
}

const BlockView = ({ tetromino }: BlockViewProps) => {
  const paddedTetromino = createPaddedTetromino(tetromino.shape);
  const height = paddedTetromino.length;
  const width = paddedTetromino[0].length;

  return (
    <Block height={height} width={width}>
      {paddedTetromino.map((shapes, y) => {
        return shapes.map((currentShape, x) => {
          return currentShape !== 0 ? (
            <Cell key={y * 5 + x} type={currentShape as TetrominoType} />
          ) : (
            <Cell key={y * 5 + x} type={0 as TetrominoType} />
          );
        });
      })}
    </Block>
  );
};

export default BlockView;
