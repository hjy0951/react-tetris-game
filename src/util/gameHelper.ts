// stage 생성
export const STAGE_HEIGHT = 20;
export const STAGE_WIDTH = 12;

export const createStage = () => {
  return Array.from({ length: STAGE_HEIGHT }, () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );
};
