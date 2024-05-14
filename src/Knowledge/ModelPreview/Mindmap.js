import React, { useState, useEffect, useRef } from "react";
import { Tree as DTree } from "react-d3-tree";
import CustomTreeNode from "./CustomTreeNode";
import { theme3Light } from "./Themes";
import { convertToMindmap, moveToRoot } from "./Mindmap.utils"; // Replace "./utils" with the correct path to the module containing the convertToMindmap function

// Constants for themes, you can uncomment any theme you want to use
// const { background, baseStyle, textColor } = theme1Light;
// const { background, baseStyle, textColor } = theme1Dark;
// const { background, baseStyle, textColor } = theme2Light;
// const { background, baseStyle, textColor } = theme2Dark;
const { background, baseStyle, textColor } = theme3Light; // Using theme3Light for example

function Tree({ mindmapByKeys, knowledge, handleNodeAdd, knowledgeChat }) {
  const [data, setData] = useState([]);
  const [translate, setTranslate] = useState({ x: 450, y: 450 });
  const [scale, setScale] = useState(0.1);
  const treeContainerRef = useRef(null);

  useEffect(() => {
    const formatData = () => {
      const rootKey = Object.keys(mindmapByKeys)[0];
      const rootNode = { ...mindmapByKeys[rootKey] };
      delete rootNode.x;
      return [convertToMindmap(rootNode, mindmapByKeys)];
    };

    if (Object.keys(mindmapByKeys).length) {
      setData(formatData());
    }
    console.log("MINDMAP BY KEYS", mindmapByKeys);
  }, [mindmapByKeys]);

  const handleNodeClick = (nodeData, { hierarchyPointNode }) => {
    const x = -hierarchyPointNode.x + window.innerWidth / 2;
    const y = -hierarchyPointNode.y + window.innerHeight / 8;
    const newScale = 0.5; // Adjust scale as needed
    setTranslate({ x, y });
    setScale(newScale);
  };

  return (
    <div
      className="mindmap-container"
      style={{
        height: "50em",
        background: background,
      }}
    >
      {data.length > 0 && (
        <DTree
          data={data}
          enableLegacyTransitions
          renderCustomNodeElement={(rd3tProps) => (
            <CustomTreeNode
              nodeStyle={baseStyle}
              textColor={textColor}
              onClick={handleNodeClick}
              onChatRequest={(nodeDatum) => {
                const path = moveToRoot(nodeDatum.id, mindmapByKeys);
                knowledgeChat(knowledge, path, (response) => {
                  handleNodeAdd(nodeDatum.id, response, mindmapByKeys);
                });
              }}
              {...rd3tProps}
            />
          )}
          nodeSize={{ x: 450, y: 450 }}
          orientation="vertical"
          pathFunc="straight"
          translate={translate}
          ref={treeContainerRef}
        />
      )}
    </div>
  );
}

export default Tree;
