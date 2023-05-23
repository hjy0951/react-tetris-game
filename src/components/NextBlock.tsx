import React from "react";
// components
import Cell from "./Cell";
// style
import { NextBlockView } from "./styles/BlockStyle";
// util
import {
  TetrominoProps,
  TetrominoShape,
  TetrominoType,
} from "../util/tetrominos";

interface BlockProps {
  tetromino: TetrominoProps;
}

const NextBlock = ({ tetromino }: BlockProps) => {
  const makePaddedTetromino = (tetromino: TetrominoShape) => {
    const paddedTetromino = [[0, 0, 0, 0, 0]] as TetrominoShape;

    for (let i = 0; i < tetromino.length; i++) {
      const line = [...tetromino[i]];
      line.unshift(0);
      while (line.length < 5) line.push(0);
      paddedTetromino.push(line);
    }
    while (paddedTetromino.length < 5) paddedTetromino.push([0, 0, 0, 0, 0]);
    return paddedTetromino;
  };

  const makeBlockCells = (tetromino: TetrominoProps) => {
    const blockCells = [];
    const paddedTetromino = makePaddedTetromino(tetromino.shape);
    for (let i = 0; i < 5; i++) {
      const lineCells = [];
      for (let j = 0; j < 5; j++) {
        const currentShape = paddedTetromino[i][j];
        lineCells.push(
          currentShape !== 0 ? (
            <Cell key={i * 5 + j} type={currentShape as TetrominoType} />
          ) : (
            <Cell key={i * 5 + j} type={0 as TetrominoType} />
          )
        );
      }
      blockCells.push(lineCells);
    }
    return blockCells;
  };

  return (
    <NextBlockView height={5} width={5}>
      {makeBlockCells(tetromino)}
    </NextBlockView>
  );
};

export default NextBlock;
