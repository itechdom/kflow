export const convertToMindmap = (currentNode, mindmapByKeys) => {
  if (!currentNode || typeof currentNode !== "object") {
    console.error("Invalid currentNode:", currentNode);
    return {}; // or any other fallback object structure
  }

  const newNode = {
    ...currentNode,
    name: currentNode.title || "No title available",
    collapsed: false,
  };
  if (Array.isArray(newNode.children)) {
    newNode.children = newNode.children.map((childId) => {
      let childNode = mindmapByKeys[childId];
      if (childId._id) {
        childNode = mindmapByKeys[childId._id];
      }
      //check if child node is not null and is an object
      if (!childNode) {
        console.error("Missing child node in mindmapByKeys for key:", childId);
        return { name: "Missing Node", children: [] }; // Fallback node structure
      }
      return convertToMindmap(childNode, mindmapByKeys);
    });
  } else {
    console.warn("Children not an array or undefined:", currentNode);
    newNode.children = [];
  }

  return newNode;
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

export const formatData = (mindmapByKeys) => {
  const rootKey = Object.keys(mindmapByKeys)[0];
  const rootNode = { ...mindmapByKeys[rootKey] };
  delete rootNode.x;
  const formattedData =  [convertToMindmap(rootNode, mindmapByKeys)];
  return formattedData;
};

export const getPrompt = (path) => `complete this object with four levels of knowledge. only return output in json. 
            don't include \`\`\`json in your response. omit ${JSON.stringify(path)} in your response and only include new additions.
            here is the object:
            ${JSON.stringify(
              path
            )}`
