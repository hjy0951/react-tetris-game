import styled from "styled-components";
// util
import { TetrominoType } from "../../util/tetrominos";

/*
TypeScript에서 styled-component에 여러 props를 넘길때
interface로 type을 지정하여 전달.
*/
interface TetrisCellProps {
  type: TetrominoType;
  color: string;
}

export const TetrisCell = styled.div<TetrisCellProps>`
  width: auto;
  background: rgba(${(props) => props.color}, 0.8);
  border: ${(props) => (props.type === 0 ? "0px solid" : "4px solid")};
  border-bottom-color: rgba(${(props) => props.color}, 0.1);
  border-right-color: rgba(${(props) => props.color}, 1);
  border-left-color: rgba(${(props) => props.color}, 0.3);
  border-top-color: rgba(${(props) => props.color}, 1);
`;
