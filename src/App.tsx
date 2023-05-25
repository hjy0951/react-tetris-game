import React from "react";
import Tetris from "./components/Tetris";
import { RecoilRoot } from "recoil";

const App = () => (
  <RecoilRoot>
    <div className="App">
      <Tetris />
    </div>
  </RecoilRoot>
);

export default App;
