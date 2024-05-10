import React from 'react';

const FantasyTreeNode = ({ nodeDatum, toggleNode }) => {
  return (
    <g>
      {/* Use an SVG for the node background to match the theme */}
      <circle r="20" fill="gold" stroke="brown" strokeWidth="3" onClick={toggleNode} />
      <text fill="maroon" x="30" y="0" textAnchor="start" alignmentBaseline="middle" fontSize="12px" style={{ pointerEvents: 'none' }}>
        {nodeDatum.name}
      </text>
      {/* Additional elements like icons can be added here */}
    </g>
  );
};

export default FantasyTreeNode;