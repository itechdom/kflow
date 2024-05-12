import React from "react";
import { Tree as DTree } from "react-d3-tree";
import CustomTreeNode from "./CustomTreeNode";

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
class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      translate: { x: 0, y: 0 },
      scale: 1,
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

  handleNodeClick = (nodeData, {hierarchyPointNode}) => {
    console.log("Clicked on Node with data: ", hierarchyPointNode.x, hierarchyPointNode.y);
    const x = -hierarchyPointNode.x  + window.innerWidth / 2;
    const y = -hierarchyPointNode.y  + window.innerHeight / 8;
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
          background: "linear-gradient(to top, #e8d1c5 0%, #f4f1ea 100%)",
        }}
      >
        {this.state.data.length > 0 && (
          <DTree
            data={this.state.data}
            enableLegacyTransitions
            renderCustomNodeElement={(rd3tProps) => (
              <CustomTreeNode onClick={this.handleNodeClick} {...rd3tProps} />
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
