import React from "react";

interface DisplayProps {
  text: string;
}

const Display = ({ text }: DisplayProps) => {
  return <div>{text}</div>;
};

export default Display;
