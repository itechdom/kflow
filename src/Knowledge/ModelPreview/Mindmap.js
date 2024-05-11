import React from "react";
import MindmapTree from "react-d3-tree";
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
    this.setState({ data });
  }

  toggleEnterState = () => {
    this.setState({ in: !this.state.in });
  };

  addNode() {}

  render() {
    return (
      <div
        class="mindmap-container"
        style={{
          height: "50em",
          background: "linear-gradient(to top, #e8d1c5 0%, #f4f1ea 100%)"
        }}
      >
        {this.state.data.length > 0 && (
          <MindmapTree
            data={this.state.data}
            renderCustomNodeElement={(rd3tProps) => (
              <CustomTreeNode {...rd3tProps} />
            )}
            nodeSize={{ x: 450, y: 450 }}
            orientation="vertical"
            pathFunc="straight"
          />
        )}
      </div>
    );
  }
}
export default Tree;
