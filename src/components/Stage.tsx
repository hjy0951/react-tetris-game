import React from "react";
import Cell from "./Cell";

interface StageProps {
  stage: [][][];
}

/*
Cell의 key
: Cell의 순서가 바뀌지 않고 인덱스가 변하지 않기 때문에
  map 처리 순서를 계산하여 사용
*/

const Stage = ({ stage }: StageProps) => {
  return (
    <div>
      {stage.map((row: [][][], y: number) =>
        row.map((cell: [][], x: number) => {
          return <Cell key={y * row.length + x} type={cell[0]} />;
        })
      )}
    </div>
  );
};

export default Stage;
