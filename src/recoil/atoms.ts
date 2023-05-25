import { atom } from "recoil";
import { TetrominoType } from "../util/tetrominos";

export const nextBlockState = atom<TetrominoType>({
  key: "nextBlockType",
  default: 0,
});
