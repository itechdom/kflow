import React, { useState, useEffect, useRef, useCallback } from "react";
import { Tree as DTree } from "react-d3-tree";
import CustomTreeNode from "./CustomTreeNode";
import { theme1Dark, theme2Dark, theme3Dark, theme3Light } from "./Themes";
import { moveToRoot, formatData } from "./Mindmap.utils";
import { useDispatch } from "react-redux";
import { setModel } from "./Model.Preview.feature"; // Ensure correct import path
import { convertObjectToMindmap } from "./Model.Preview.feature.helper";

const { background, baseStyle, textColor } = theme3Light;

function Mindmap({ mindmapByKeys, knowledge, knowledgeChat }) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [translate, setTranslate] = useState({ x: 450, y: 450 });
  const [scale, setScale] = useState(0.1);
  const treeContainerRef = useRef(null);

  useEffect(() => {
    if (Object.keys(mindmapByKeys).length) {
      const formattedData = formatData(mindmapByKeys);
      setData(formattedData);
    }
  }, [mindmapByKeys]);

  const handleNodeClick = useCallback((nodeData, { hierarchyPointNode }) => {
    // const x = -hierarchyPointNode.x + window.innerWidth / 2;
    // const y = -hierarchyPointNode.y + window.innerHeight / 8;
    // const newScale = 0.5;
    // setTranslate({ x, y });
    // setScale(newScale);
  }, []);

  return (
    <div
      className="mindmap-container"
      style={{ height: "50em", background: background }}
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
                        const converted = convertObjectToMindmap(
                          response,
                          nodeDatum.id,
                          mindmapByKeys
                        );
                        dispatch(setModel({ model: { body: converted } }));
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

export default Mindmap;
