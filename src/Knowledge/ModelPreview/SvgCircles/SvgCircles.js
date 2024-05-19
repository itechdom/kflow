import React from "react";

const SvgCircles = ({
  cx,
  cy,
  stroke, // Border color of the circle
  strokeWidth, // Width of the stroke
  filter,
  r,
  onClick, // Onclick event handler
  nodeStyle
}) => {
  return (
    <>
      <circle
        r={r}
        cx={cx}
        cy={cy}
        style={nodeStyle}
        stroke={stroke}
        strokeWidth={strokeWidth}
        filter={filter}
        onClick={onClick}
      />
    </>
  );
};

export default SvgCircles;
