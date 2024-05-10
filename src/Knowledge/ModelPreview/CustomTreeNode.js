import React, { useEffect } from "react";

const CustomTreeNode = ({ nodeDatum, toggleNode }) => {
  const handleClick = () => {
    console.log("Node clicked:", nodeDatum.name);
    toggleNode(); // This function is provided by react-d3-tree to toggle the node
  };
  const [showNote, setShowNote] = React.useState(false);
  const [width, setWidth] = React.useState(120);
  const [height, setHeight] = React.useState(50);
  useEffect(() => {
    //truncate if length is greater than 30
    if (nodeDatum.name.length > 30) {
    //   nodeDatum.name = nodeDatum.name.substring(0, 30) + "...";
      setShowNote(true);
    }
    return () => {
      console.log("Node unmounted:", nodeDatum.name);
    };
  }, [nodeDatum.name]);
  return (
    <g>
      {/* Node shape (circle or rectangle) */}
      <rect
        width="240"
        height="200"
        x="-60"
        y="-25"
        fill="white"
        stroke="black"
        strokeWidth="1.5"
        onClick={handleClick}
      />
      <foreignObject x="-30" y="-12.5" width="200" height="200">
        <p xmlns="http://www.w3.org/1999/xhtml">{nodeDatum.name}</p>
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
