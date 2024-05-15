import React, { useState, useEffect, useRef, useCallback } from "react";
import { Tree as DTree } from "react-d3-tree";
import CustomTreeNode from "./CustomTreeNode";
import { theme3Light } from "./Themes";
import { convertToMindmap, moveToRoot } from "./Mindmap.utils";
import { convertObjectToMindmap } from "./Model.Preview.state";

const { background, baseStyle, textColor } = theme3Light;

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
  }, [mindmapByKeys]);

  const handleNodeClick = useCallback((nodeData, { hierarchyPointNode }) => {
    const x = -hierarchyPointNode.x + window.innerWidth / 2;
    const y = -hierarchyPointNode.y + window.innerHeight / 8;
    const newScale = 0.5;
    setTranslate({ x, y });
    setScale(newScale);
  }, []);

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
          renderCustomNodeElement={(rd3tProps) =>
            rd3tProps.nodeDatum.title && (
              <CustomTreeNode
                nodeStyle={baseStyle}
                textColor={textColor}
                onClick={handleNodeClick}
                onChatRequest={(nodeDatum) => {
                  if (nodeDatum.title) {
                    const path = moveToRoot(nodeDatum.id, mindmapByKeys);
                    knowledgeChat(knowledge, path, (response) => {
                      try {
                        convertObjectToMindmap(
                          response,
                          nodeDatum.id,
                          mindmapByKeys,
                          (converted) => {
                            handleNodeAdd(nodeDatum.id, converted, mindmapByKeys);
                          }
                        );
                      } catch (e) {
                        console.log("ERROR", e);
                      }
                    });
                  }
                }}
                {...rd3tProps}
              />
            )
          }
          nodeSize={{ x: 450, y: 450 }}
          orientation="vertical"
          pathFunc="straight"
          translate={translate}
          scale={scale}
          ref={treeContainerRef}
        />
      )}
    </div>
  );
}

export default React.memo(Tree);