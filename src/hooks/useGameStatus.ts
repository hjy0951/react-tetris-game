import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";

// Strict Mode로 인해 develop 모드에서 useEffect가 2번 실행되어 rowsCleared 업데이트가 2번 이루어짐

export const useGameStatus = (
  rowsCleared: number
): [
  score: number,
  setScore: Dispatch<SetStateAction<number>>,
  rows: number,
  setRows: Dispatch<SetStateAction<number>>,
  level: number,
  setLevel: Dispatch<SetStateAction<number>>
] => {
  const [score, setScore] = useState<number>(0);
  const [rows, setRows] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);

  const linePoints = useMemo(() => [0, 50, 100, 300, 1200], []);

  const updateStatus = useCallback(() => {
    if (rowsCleared > 0) {
      setScore((prev) => prev + linePoints[rowsCleared] * level);
      setRows((prev) => prev + rowsCleared);
    }
  }, [level, linePoints, rowsCleared]);

  useEffect(() => {
    updateStatus();
  }, [updateStatus, rowsCleared, score]);

  return [score, setScore, rows, setRows, level, setLevel];
};
