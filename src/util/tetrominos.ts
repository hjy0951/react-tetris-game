/*
Type Assertion을 위한 Type 선언
: 접근할 Object의 Property Key들을 Type으로 선언하지 않을 경우,
  일반 string으로 property에 접근하게 되어 오류가 발생.
  따라서 Type 선언 후, "as"를 이용하여 해당 변수가 property 접근을 위한 Key라는
  것을 명시하여 Object의 property에 접근
*/
export type TetrominoType = 0 | "I" | "J" | "L" | "O" | "S" | "T" | "Z";

export type TetrominoShape = Array<Array<TetrominoType>>;

export interface TetrominoProps {
  shape: TetrominoShape;
  color: string;
}

export const TETROMINOS = {
  0: { shape: [[0]], color: "0, 0, 0" },
  I: {
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
    ],
    color: "80,227,230",
  },
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0],
    ],
    color: "36,95,223",
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"],
    ],
    color: "223,173,36",
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: "223,217,36",
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0],
    ],
    color: "48,211,56",
  },
  T: {
    shape: [
      [0, 0, 0],
      ["T", "T", "T"],
      [0, "T", 0],
    ],
    color: "132,61,198",
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0],
    ],
    color: "227,78,78",
  },
};

export const pickRandomTetromino = (): TetrominoProps => {
  const testrominoTypes = "IJLOSTZ";
  const randomNumber = Math.floor(Math.random() * testrominoTypes.length);
  const randomPick = testrominoTypes[randomNumber] as TetrominoType;
  const tetromino = TETROMINOS[randomPick] as TetrominoProps;
  return tetromino;
};
