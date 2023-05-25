import { atom } from "recoil";
import { TetrominoType } from "../util/tetrominos";

export const nextBlockState = atom<TetrominoType>({
  key: "nextBlockType",
  default: 0,
});

export const savedBlockState = atom<TetrominoType>({
  key: "savedBlockType",
  default: 0,
});
