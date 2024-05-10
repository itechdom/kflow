import React from "react";

const CustomTreeNode = ({ nodeDatum, toggleNode }) => {
  const handleClick = () => {
    console.log("Node clicked:", nodeDatum.name);
    toggleNode(); // This function is provided by react-d3-tree to toggle the node
  };
  return (
    <g>
      {/* Node shape (circle or rectangle) */}
      <rect
        width="120"
        height="50"
        x="-60"
        y="-25"
        fill="white"
        stroke="black"
        strokeWidth="1.5"
        onClick={handleClick}
      />
      <text
        fill="black"
        x="0"
        y="0"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="24px"
        onClick={handleClick}
        style={{ pointerEvents: "none" }}
      >
        {nodeDatum.name}
      </text>
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
