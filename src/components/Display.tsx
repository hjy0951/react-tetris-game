import React from "react";
// style
import { TetrisDisplay } from "./styles/DisplayStyle";

interface DisplayProps {
  gameOver?: boolean;
  text: string;
}

const Display = ({ gameOver, text }: DisplayProps) => {
  return gameOver ? (
    <TetrisDisplay gameOver={gameOver}>{text}</TetrisDisplay>
  ) : (
    <TetrisDisplay>{text}</TetrisDisplay>
  );
};

export default Display;
