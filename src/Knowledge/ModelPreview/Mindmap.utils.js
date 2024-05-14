export const convertToMindmap = (currentNode, mindmapByKeys) => {
  if (!currentNode || typeof currentNode !== "object") {
    console.error("Invalid currentNode:", currentNode);
    return {}; // or any other fallback object structure
  }

  currentNode.name = currentNode.title || "No title available";
  currentNode.collapsed = true;

  if (Array.isArray(currentNode.children)) {
    currentNode.children = currentNode.children.map((childId) => {
      const childNode = mindmapByKeys[childId];
      if (!childNode) {
        console.error("Missing child node in mindmapByKeys for key:", childId);
        return { name: "Missing Node", children: [] }; // Fallback node structure
      }
      return convertToMindmap(childNode, mindmapByKeys);
    });
  } else {
    console.warn("Children not an array or undefined:", currentNode);
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
