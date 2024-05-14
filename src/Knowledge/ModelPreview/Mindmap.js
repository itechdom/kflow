import React from "react";
import { Tree as DTree } from "react-d3-tree";
import CustomTreeNode from "./CustomTreeNode";
import {
  theme1Light,
  theme1Dark,
  theme2Dark,
  theme2Light,
  theme3Light,
  theme3Dark,
} from "./Themes";
import { node } from "prop-types";

//My Favorite Theme
// const {background, baseStyle, textColor} = theme1Light;
// const { background, baseStyle, textColor } = theme1Dark;
// const {background, baseStyle, textColor} = theme2Light;
// const {background, baseStyle, textColor} = theme2Dark;
const { background, baseStyle, textColor } = theme3Light;
// const {background, baseStyle, textColor} = theme3Dark;

export const convertToMindmap = (currentNode, mindmapByKeys) => {
  currentNode.name = currentNode.title;
  currentNode.collapsed = true;
  currentNode.children = currentNode.children.map((child) => {
    let nchild = Object.assign({}, mindmapByKeys[child]);
    let { x, ...rest } = nchild;
    return rest;
  });
  if (currentNode.children.length > 0) {
    currentNode.children = currentNode.children.map((child, index) => {
      let converted = convertToMindmap(child, mindmapByKeys);
      return converted;
    });
  }
  return currentNode;
};

function moveToRoot(nodeId, nodes) {
  let path = {};
  let track = [];

  function traverseUp(nodeId) {
    const currentNode = nodes[nodeId];
    if (!currentNode) {
      console.log("Node not found");
      return;
    }

    // If there is a parent, recurse with the parent's ID
    track.unshift(currentNode.title);
    if (currentNode.parent && nodes[currentNode.parent]) {
      traverseUp(currentNode.parent);
    }
  }

  traverseUp(nodeId);
  //envelop the current node in a new path object with the node id as the key
  //first key
  path = track.reduceRight(
    (acc, key) => {
      return { [key]: acc };
    },
    {}
  );
  return path;
}

class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      translate: { x: 450, y: 450 },
      scale: 0.1,
    };
  }

  formatData(mindmapByKeys) {
    const rootKey = Object.keys(mindmapByKeys)[0];
    const tmp = Object.assign({}, mindmapByKeys[rootKey]);
    const { x, ...rootNode } = tmp;
    convertToMindmap(rootNode, mindmapByKeys);
    return [rootNode];
  }

  componentDidMount() {
    let data = this.formatData(Object.assign({}, this.props.mindmapByKeys));
    console.log(data);
    this.setState({ data });
    this.treeContainerRef = React.createRef();
  }

  toggleEnterState = () => {
    this.setState({ in: !this.state.in });
  };

  handleNodeClick = (nodeData, { hierarchyPointNode }) => {
    console.log(nodeData);
    console.log(
      "Clicked on Node with data: ",
      hierarchyPointNode.x,
      hierarchyPointNode.y
    );
    const x = -hierarchyPointNode.x + window.innerWidth / 2;
    const y = -hierarchyPointNode.y + window.innerHeight / 8;
    const newScale = 0.5; // Set fixed scale or calculate dynamically based on your needs
    this.setState({ translate: { x, y } });
    this.setState({ scale: newScale });
  };

  // handleNodeClick = (nodeData) => {
  //   console.log("Clicked on Node with data: ", nodeData);
  //   console.log(this.treeContainerRef);
  //   const svg = document.querySelector("svg");

  //   // Determine the desired target position
  //   console.log(nodeData);
  //   const x = -nodeData.x;
  //   const y = -nodeData.y;
  //   const scale = 2; // Example scale factor

  //   // Create a smooth transition
  //   svg.setAttribute("transform", `translate(${x}, ${y}) scale(${scale})`);
  // };

  addNode() {}

  render() {
    return (
      <div
        class="mindmap-container"
        style={{
          height: "50em",
          background: background,
        }}
      >
        {this.state.data.length > 0 && (
          <DTree
            data={this.state.data}
            enableLegacyTransitions
            renderCustomNodeElement={(rd3tProps) => (
              <CustomTreeNode
                nodeStyle={baseStyle}
                textColor={textColor}
                onClick={this.handleNodeClick}
                onChatRequest={(nodeDatum) => {
                  const path =  moveToRoot(nodeDatum.id, this.props.mindmapByKeys)
                  this.props.knowledgeChat(this.props.knowledge, path);
                }}
                {...rd3tProps}
              />
            )}
            nodeSize={{ x: 450, y: 450 }}
            orientation="vertical"
            pathFunc="straight"
            translate={this.state.translate}
            ref={this.treeContainerRef}
          />
        )}
      </div>
    );
  }
}
export default Tree;
