import React from "react";
// style
import { TetrisStartButton } from "./styles/StartButtonStyle";

interface StartButtonProps {
  onClickFn: any;
}

const StartButton = ({ onClickFn }: StartButtonProps) => {
  return <TetrisStartButton onClick={onClickFn}>Start Game</TetrisStartButton>;
};

export default StartButton;
