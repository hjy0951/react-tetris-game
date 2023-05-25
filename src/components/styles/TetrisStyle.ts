import styled from "styled-components";
// img
import backgroundImage from "../../img/background.jpg";

export const TetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${backgroundImage}) #000;
  background-size: cover;
  overflow: hidden;
`;

export const TetrisContainer = styled.div`
  padding: 40px;
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  align-items: flex-start;

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;
