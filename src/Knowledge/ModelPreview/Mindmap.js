import React, { useState, useEffect, useRef, useCallback } from "react";
import { Tree as DTree } from "react-d3-tree";
import CustomTreeNode from "./CustomTreeNode";
import { theme3Light } from "./Themes";
import { moveToRoot, formatData } from "./Mindmap.utils";
import { useDispatch } from "react-redux";
import { setModel } from "./Model.Preview.feature"; // Ensure correct import path
import {
  convertObjectToMindmap,
  collapseAllNodes,
} from "./Model.Preview.feature.helper";
import { getPrompt, cleanResponse } from "./Mindmap.utils";

const { background, baseStyle, textColor } = theme3Light;

function Mindmap({ mindmapByKeys, knowledge, knowledgeChat, selectedNode }) {
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

  useEffect(() => {
    if (selectedNode && treeContainerRef.current) {
      const nodeElement = treeContainerRef.current.querySelector(
        `[data-node-id="${selectedNode}"]`
      );
      if (nodeElement) {
        const { x, y } = nodeElement.getBoundingClientRect();
        setTranslate({
          x: -x + window.innerWidth / 2,
          y: -y + window.innerHeight / 2,
        });
        setScale(1); // Adjust the scale as needed
      }
    }
  }, [selectedNode]);

  const handleNodeClick = useCallback((nodeData, { hierarchyPointNode }) => {
    // Handle node click events if needed
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
                    knowledgeChat(
                      knowledge,
                      path,
                      getPrompt(path),
                      (response) => {
                        try {
                          const cleanedResponse = cleanResponse(response, path);
                          console.log("cleanedResponse", cleanedResponse);
                          const converted = convertObjectToMindmap(
                            cleanedResponse,
                            nodeDatum.id,
                            mindmapByKeys
                          );
                          console.log("converted", converted);
                          const collapsedConverted = collapseAllNodes(
                            converted,
                            converted[Object.keys(converted)[0]].id,
                            nodeDatum.id
                          );
                          dispatch(
                            setModel({ model: { body: collapsedConverted[0] } })
                          );
                        } catch (e) {
                          console.log("ERROR", e);
                        }
                      }
                    );
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
