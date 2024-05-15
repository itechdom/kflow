import { v1 as uuidv1 } from "uuid";

// Helper functions
export const convertObjectToMindmap = (obj, rootId, mindmapByKeys) => {
  // Add root node first
  console.log("ROOT ID", rootId);
  mindmapByKeys = addNodeToMindmap(mindmapByKeys, null, rootId);

  const nodesToAdd = bulkTraverseAndAddNodes(mindmapByKeys, obj, rootId);
  nodesToAdd.forEach((node) => {
    mindmapByKeys = addNodeToMindmap(mindmapByKeys, node.parent, node.title);
  });

  return mindmapByKeys;
};

export const bulkTraverseAndAddNodes = (mindmapByKeys, obj, parentId) => {
  let nodesToAdd = [];

  if (typeof obj !== "object") return nodesToAdd;

  Object.keys(obj).forEach((key) => {
    const node = bulkHandleNodeAdd(mindmapByKeys, parentId, key);
    nodesToAdd.push(node);
    mindmapByKeys = addNodeToMindmap(mindmapByKeys, parentId, key);
    nodesToAdd = nodesToAdd.concat(
      bulkTraverseAndAddNodes(mindmapByKeys, obj[key], node._id)
    );
  });

  return nodesToAdd;
};

export const bulkHandleNodeAdd = (mindmapByKeys, nodeId, title) => {
  const _id = uuidv1();
  let group = 0;
  let size = 20;

  if (nodeId) {
    const parent = mindmapByKeys[nodeId];
    if (!parent) {
      throw new Error(
        `Parent not found during bulkHandleNodeAdd for nodeId: ${nodeId}`
      );
    }
    group = parseInt(parent.level.split(".").join(""));
    size = 20 / parent.level.split(".").length;
  }

  return {
    _id,
    id: _id,
    title,
    name: title,
    parent: nodeId,
    size,
    group,
  };
};

export const addNodeToMindmap = (mindmapByKeys, nodeId, title) => {
  const _id = uuidv1();
  let parent = null;
  let group = 0;
  let size = 20;

  if (nodeId) {
    parent = mindmapByKeys[nodeId];
    if (!parent) {
      throw new Error(
        `Parent not found during addNodeToMindmap for nodeId: ${nodeId}`
      );
    }
    group = parseInt(parent.level.split(".").join(""));
    size = 20 / parent.level.split(".").length;
  }

  const newMindmapByKeys = {
    ...mindmapByKeys,
    [_id]: {
      _id,
      id: _id,
      title,
      level: parent ? `${parent.level}.${parent.children.length}` : "0",
      children: [],
      parent: nodeId,
      size,
      group,
      links: parent
        ? {
            source: parent,
            target: _id,
            title,
          }
        : {},
    },
  };

  if (nodeId) {
    newMindmapByKeys[nodeId] = {
      ...mindmapByKeys[nodeId],
      children: [...mindmapByKeys[nodeId].children, _id],
    };
  }

  return newMindmapByKeys;
};

// Compare paths for visibility
export const comparePath = (currentLevel, visibleLevel) => {
  const visibleArray = visibleLevel.split(".");
  const currentArray = currentLevel.split(".");
  return currentArray.map((lev, index) => visibleArray[index] === lev);
};

// Check if a node is visible
export const isVisible = (mindmapByKeys, visibleNodeKeys, nodeId) => {
  const currentLevel = mindmapByKeys[nodeId].level;
  if (visibleNodeKeys[currentLevel] === false) return false;
  return Object.keys(visibleNodeKeys).some((visibleLevel) => {
    const res = comparePath(
      mindmapByKeys[nodeId].level,
      visibleLevel,
      visibleNodeKeys[visibleLevel]
    );
    return res.every(Boolean);
  });
};