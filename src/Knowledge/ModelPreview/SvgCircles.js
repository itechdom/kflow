import React from "react";

const SvgCircles = ({
  cx,
  cy,
  stroke, // Border color of the circle
  strokeWidth, // Width of the stroke
  filter,
  r,
  onClick, // Onclick event handler
}) => {
  // Styles for the base of all circles
  const baseStyle = {
    fill: "white", // Background color for SVG
    stroke: "black", // Border color
    strokeWidth: 1, // Border thickness
  };

  // Styles for specific nodes
  const blueNodeStyle = {
    ...baseStyle,
    fill: "#0077CC",
  };

  const orangeNodeStyle = {
    ...baseStyle,
    fill: "#FFAA00",
  };

  const greyNodeStyle = {
    ...baseStyle,
    fill: "#CCCCCC",
  };

  const customNodeStyle = {
    ...baseStyle,
    fill: "#0088AA",
  };

  return (
    <>
      <circle r={r} cx={cx} cy={cy} style={blueNodeStyle} stroke={stroke} strokeWidth={strokeWidth} filter={filter} onClick={onClick} />
      {/* <circle cx="200" cy="100" style={orangeNodeStyle} /> */}
      {/* <circle cx="300" cy="100" style={greyNodeStyle} /> */}
      {/* <circle cx="400" cy="100" style={customNodeStyle} /> */}
    </>
  );
};

export default SvgCircles;
