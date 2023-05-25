import React from "react";
// components
import Cell from "./Cell";
// style
import {
  Block,
  BlockViewContainer,
  BlockViewHeader,
} from "./styles/BlockViewStyle";
// util
import { TetrominoProps, TetrominoType } from "../util/tetrominos";
import { createPaddedTetromino } from "../util/gameHelper";

interface BlockViewProps {
  name: string;
  tetromino: TetrominoProps;
  leftRadius: number;
  rightRadius: number;
}

const BlockView = ({
  name,
  tetromino,
  leftRadius,
  rightRadius,
}: BlockViewProps) => {
  const paddedTetromino = createPaddedTetromino(tetromino.shape);
  const height = paddedTetromino.length;
  const width = paddedTetromino[0].length;

  return (
    <BlockViewContainer>
      <BlockViewHeader leftRadius={leftRadius} rightRadius={rightRadius}>
        {name}
      </BlockViewHeader>
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
    </BlockViewContainer>
  );
};

export default BlockView;
