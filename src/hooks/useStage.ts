import { useState } from "react";
// util
import { createStage } from "../util/gameHelper";
import { StageFormat } from "../components/Stage";

/*
현재 테트리스 게임판의 상태를 저장하기 위한 hook
*/

export const useStage = () => {
  const [stage, setStage] = useState<StageFormat>(createStage());

  return [stage, setStage];
};
