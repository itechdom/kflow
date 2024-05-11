import React, { useEffect, useRef } from "react";
import SvgCircles from "./SvgCircles";

const CustomTreeNode = ({ nodeDatum, toggleNode }) => {
  const handleClick = () => {
    toggleNode(); // This function is provided by react-d3-tree to toggle the node
  };
  const [cx, setCx] = React.useState(30);
  const [cy, setCY] = React.useState(30);
  const [radius, setRadius] = React.useState(100);
  const [minimumTextLength, setMinimumTextLength] = React.useState(20);
  const [pWidth, setPWidth] = React.useState(0);
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
    console.log("PWidth", pWidth);
    if (nodeDatum.name.length > minimumTextLength) {
      setRadius(200);
      setCx(60);
      setCY(60);
      const multiplier = nodeDatum.name.length / minimumTextLength;
      const pWidth = pRef.current.offsetWidth;
    } else {
      setCx(0);
      setCY(20);
    }
    toggleNode();
    return () => {
      console.log("Node unmounted:", nodeDatum.name);
    };
  }, [nodeDatum.name, pWidth, minimumTextLength, toggleNode]);
  // Measure the width of the <p> tag after component mounts
  useEffect(() => {
    if (pRef.current) {
      setPWidth(pRef.current.getBoundingClientRect().width);
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
        onClick={handleClick} // Onclick event handler
        style={nodeStyles} // Additional styles if needed
      />
      <foreignObject
        onClick={handleClick}
        x="-60"
        y="-12.5"
        width="200"
        height="200"
        ref={pRef}
      >
        <p
          style={{ fontSize: "20px", color: "white" }}
          xmlns="http://www.w3.org/1999/xhtml"
        >
          {nodeDatum.name}
        </p>
      </foreignObject>
      <text
        fill="black"
        x="0"
        y="0"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="24px"
        onClick={handleClick}
        style={{ pointerEvents: "none" }}
      ></text>
      {nodeDatum.attributes && (
        <text
          fill="grey"
          x="0"
          y="20"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="12px"
          style={{ pointerEvents: "none" }}
        >
          {nodeDatum.attributes.description}
        </text>
      )}
    </g>
  );
};

export default CustomTreeNode;
