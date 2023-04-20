import styled from "styled-components";

interface TetrisDisplayProps {
  gameOver?: boolean;
}

export const TetrisDisplay = styled.div<TetrisDisplayProps>`
  margin: 0 0 20px 0;
  padding: 20px;
  width: 100%;
  min-height: 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border: 4px solid #333;
  border-radius: 20px;
  color: ${(props) => (props.gameOver ? "red" : "#999")};
  background: #000;
  font-family: Hanna, Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
`;
