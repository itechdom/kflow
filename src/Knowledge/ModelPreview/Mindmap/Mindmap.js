import React, { useState, useEffect, useRef, useCallback } from "react";
import { Tree as DTree } from "react-d3-tree";
import CustomTreeNode from "../CustomTreeNode/CustomTreeNode";
import { theme3Light } from "../Themes/Themes";
import { moveToRoot, formatData, getDetailsPrompt } from "./Mindmap.utils";
import { useDispatch } from "react-redux";
import { setModel } from "../ModelPreview/Model.Preview.feature";
import {
  convertObjectToMindmap,
  collapseAllNodes,
} from "../ModelPreview/Model.Preview.feature.helper";
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
                onTopicDetails={(nodeDatum) => {
                  // knowledge chat with a prompt
                  if (nodeDatum.title) {
                    const { path, track } = moveToRoot(
                      nodeDatum.id,
                      mindmapByKeys
                    );
                    knowledgeChat(
                      knowledge,
                      path,
                      getDetailsPrompt(nodeDatum.title),
                      (response) => {
                        try {
                          const converted = convertObjectToMindmap(
                            response,
                            nodeDatum.id,
                            mindmapByKeys
                          );
                          const collapsedConverted = collapseAllNodes(
                            converted,
                            converted[Object.keys(converted)[0]].id,
                            nodeDatum.id
                          );
                          dispatch(
                            setModel({ model: { body: collapsedConverted } })
                          );
                        } catch (e) {
                          console.log("ERROR", e);
                        }
                      }
                    );
                  }
                }}
                onChatRequest={(nodeDatum) => {
                  if (nodeDatum.title) {
                    const { path, track } = moveToRoot(
                      nodeDatum.id,
                      mindmapByKeys
                    );
                    let removedSecondTimeDuplicateKeys = track.filter(
                      (key, index) => {
                        const firstIndexOfKey = track.indexOf(key);
                        return firstIndexOfKey === index;
                      }
                    );
                    console.log(removedSecondTimeDuplicateKeys);
                    knowledgeChat(
                      knowledge,
                      path,
                      getPrompt(nodeDatum.title, track[0] ? track[0] : ""),
                      (response) => {
                        try {
                          const converted = convertObjectToMindmap(
                            response,
                            nodeDatum.id,
                            mindmapByKeys
                          );
                          const collapsedConverted = collapseAllNodes(
                            converted,
                            converted[Object.keys(converted)[0]].id,
                            nodeDatum.id
                          );
                          dispatch(
                            setModel({ model: { body: collapsedConverted } })
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
