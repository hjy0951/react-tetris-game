import styled from "styled-components";

interface BlockProps {
  height: number;
  width: number;
}

interface BlockViewHeaderProps {
  leftRadius: number;
  rightRadius: number;
}

export const BlockViewContainer = styled.div`
  width: 12vw;
  display: flex;
  flex-direction: column;
`;

export const BlockViewHeader = styled.div<BlockViewHeaderProps>`
  margin: 0;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 0.2rem solid #333;
  border-top-left-radius: ${(props) => props.leftRadius}rem;
  border-top-right-radius: ${(props) => props.rightRadius}rem;
  font-weight: 800;
  font-family: Hanna, "Arial Narrow Bold", sans-serif;
`;

export const Block = styled.div<BlockProps>`
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
