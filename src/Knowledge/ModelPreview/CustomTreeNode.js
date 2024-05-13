import React, { useEffect, useRef } from "react";
import SvgCircles from "./SvgCircles";

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + "...";
  }
  return text;
}

const CustomTreeNode = ({ nodeDatum, toggleNode, onClick, nodeStyle, ...rest }) => {
  const MIN_TEXT_LENGTH = 20;
  const MAX_TEXT_LENGTH = 95;
  const handleClick = () => {
    onClick(nodeDatum, rest); // This function is provided by react-d3-tree to handle click events
    toggleNode(); // This function is provided by react-d3-tree to toggle the node
  };
  const [cx, setCx] = React.useState(30);
  const [cy, setCY] = React.useState(30);
  const [radius, setRadius] = React.useState(100);
  const [pWidth, setPWidth] = React.useState(0);
  const [pHeight, setPHeight] = React.useState(0);
  const pRef = useRef(null);
  const nodeStyles = {
    fill: "white",
    stroke: "#2196F3",
    strokeWidth: 2,
    cursor: "pointer",
    transition: "all 0.2s ease",

    // Hover styles
    "&:hover": {
      transform: "scale(1.1)",
      stroke: "#FF9800",
    },

    // Nested node-label styles
    "& .node-label": {
      fontFamily: "'Roboto', sans-serif",
      fill: "black",
      textAnchor: "middle",
    },
  };
  useEffect(() => {
    //truncate if length is greater than 30
    if (nodeDatum.name.length > MIN_TEXT_LENGTH) {
      setRadius(200);
      setCx(0);
      setCY(80);
      if (nodeDatum.name.length > MAX_TEXT_LENGTH) {
        nodeDatum.name = truncateText(nodeDatum.name, MAX_TEXT_LENGTH);
      }
    } else {
      setRadius(150);
      setCx(0);
      setCY(20);
    }
    toggleNode();
  }, [nodeDatum, pWidth, pHeight, toggleNode]);
  // Measure the width of the <p> tag after component mounts
  useEffect(() => {
    if (pRef.current) {
      setPWidth(pRef.current.getBoundingClientRect().width);
      setPHeight(pRef.current.getBoundingClientRect().height);
    }
  }, []);
  return (
    <g>
      <defs>
        <filter id="dropshadow" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="2" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5" /> {/* Transparency */}
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />{" "}
          </feMerge>
        </filter>
      </defs>
      <SvgCircles
        cx={cx} // Center x coordinate
        cy={cy} // Center y coordinate
        r={radius} // Radius of the circle
        fill="white" // Background color of the circle
        stroke="black" // Border color of the circle
        strokeWidth="1.5" // Width of the stroke
        filter="url(#dropshadow)"
        nodeStyle={nodeStyle}
        onClick={handleClick} // Onclick event handler
        style={nodeStyles} // Additional styles if needed
      />
      <foreignObject
        onClick={handleClick}
        x="-70"
        y="-70"
        width="200"
        height="200"
        ref={pRef}
      >
        <p
          style={{
            fontSize: "36px",
            color: "white"
          }}
          xmlns="http://www.w3.org/1999/xhtml"
        >
          {nodeDatum.name}
        </p>
      </foreignObject>
      {/* <SpriteDisplay position={3} x={-250} y={-100} spriteWidth={100} spriteHeight={100} totalWidth={100} totalHeight={100} imageUrl="/images/planets-sprite-sheet.png" /> */}
    </g>
  );
};

export default CustomTreeNode;
