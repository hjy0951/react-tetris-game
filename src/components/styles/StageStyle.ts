import styled from "styled-components";

interface TetrisStageProps {
  height: number;
  width: number;
}

export const TetrisStage = styled.div<TetrisStageProps>`
  width: 100%;
  max-width: 30vw;
  display: grid;
  grid-template-rows: repeat(
    ${(props) => props.height},
    calc(30vw / ${(props) => props.width})
  );
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  background: #111;
`;
