export const convertToMindmap = (currentNode, mindmapByKeys) => {
  if (!currentNode || typeof currentNode !== "object") {
    console.error("Invalid currentNode:", currentNode);
    return {}; // or any other fallback object structure
  }

  // Ensuring currentNode has a title and children properties
  const { title, children } = currentNode;
  if (!title) {
    console.error("currentNode missing title:", currentNode);
    return {}; // or any other fallback object structure
  }

  currentNode.name = title;
  currentNode.collapsed = true;

  // Ensure children is an array and map through it safely
  if (Array.isArray(children)) {
    currentNode.children = children.map((child) => {
      const childNode = mindmapByKeys[child];
      if (!childNode) {
        console.error("Missing child node in mindmapByKeys for key:", child);
        return {}; // handle missing child node case
      }
      return convertToMindmap(childNode, mindmapByKeys);
    });
  } else {
    currentNode.children = [];
  }

  return currentNode;
};

export function moveToRoot(nodeId, nodes) {
  let path = {};
  let track = [];

  function traverseUp(currentId) {
    const currentNode = nodes[currentId];
    if (!currentNode) {
      console.error("Node not found for ID:", currentId);
      return; // stop if the node is not found
    }

    track.unshift(currentNode.title); // safely add title because node exists
    if (currentNode.parent) {
      traverseUp(currentNode.parent);
    }
  }

  if (nodes && nodes[nodeId]) {
    traverseUp(nodeId);
    path = track.reduceRight((acc, key) => ({ [key]: acc }), {});
  } else {
    console.error("Invalid nodeId or nodes structure:", nodeId, nodes);
  }

  return path;
}