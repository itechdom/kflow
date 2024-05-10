import React from 'react';

const FantasyTreeNode = ({ nodeDatum, toggleNode }) => {
  return (
    <g>
      {/* Circle for the node background */}
      <circle r="20" fill="gold" stroke="brown" strokeWidth="3" onClick={toggleNode} />

      {/* Node label */}
      <text fill="maroon" x="30" y="0" textAnchor="start" alignmentBaseline="middle" fontSize="12px" style={{ pointerEvents: 'none' }}>
        {nodeDatum.name}
      </text>

      {/* SVG Icon next to the node text */}
      <svg x="50" y="-10" width="20" height="20" viewBox="0 0 24 24">
        <path fill="maroon" d="M12,2A10,10 0 1,0 22,12A10,10 0 0,0 12,2Z" />
      </svg>

      {/* Additional elements can be placed here */}
    </g>
  );
};

export default FantasyTreeNode;