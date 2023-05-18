import styled from "styled-components";

interface BlockViewProps {
  height: number;
  width: number;
}

export const BlockView = styled.div<BlockViewProps>`
  width: 100%;
  max-width: 12vw;
  display: grid;
  grid-template-rows: repeat(
    ${(props) => props.height},
    calc(12vw / ${(props) => props.width})
  );
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  background: #111;
`;
