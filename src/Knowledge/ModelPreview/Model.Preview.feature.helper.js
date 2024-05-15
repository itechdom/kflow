import { v1 as uuidv1 } from "uuid";

// Centralized function to create a new node
const createNode = (nodeId, title, mindmapByKeys) => {
  const _id = uuidv1();
  let group = null;
  let size = null;
  let level = "0";
  let parent = null;

  if (nodeId) {
    parent = mindmapByKeys[nodeId];
    if (!parent) {
      throw new Error(`Parent not found for nodeId: ${nodeId}`);
    }
    group = null;
    size = null;
    level = `${parent.level}.${parent.children.length}`;
  }

  const node = {
    _id,
    id: _id,
    title,
    level,
    children: [],
    parent: nodeId,
    size,
    group,
    links: parent ? { source: parent._id, target: _id, title } : {},
  };

  return { _id, node };
};

// Function to convert object to mindmap
export const convertObjectToMindmap = (obj, rootId, mindmapByKeys) => {
  const { _id: rootNodeId, node: rootNode } = createNode(
    null,
    rootId,
    mindmapByKeys
  );
  let newMindmapByKeys = {
    ...mindmapByKeys,
    [rootNodeId]: rootNode,
  };

  const nodesToAdd = bulkTraverseAndAddNodes(newMindmapByKeys, obj, rootNodeId);
  nodesToAdd.forEach((node) => {
    newMindmapByKeys = addNodeToMindmap(
      newMindmapByKeys,
      node.parent,
      node.title,
      node._id
    );
  });

  return newMindmapByKeys;
};

export const bulkTraverseAndAddNodes = (mindmapByKeys, obj, parentId) => {
  let nodesToAdd = [];

  if (typeof obj !== "object") return nodesToAdd;

  Object.keys(obj).forEach((key) => {
    const { _id, node } = createNode(parentId, key, mindmapByKeys);
    nodesToAdd.push(node);
    mindmapByKeys = addNodeToMindmap(mindmapByKeys, parentId, key, _id);
    nodesToAdd = nodesToAdd.concat(
      bulkTraverseAndAddNodes(mindmapByKeys, obj[key], _id)
    );
  });

  return nodesToAdd;
};

export const addNodeToMindmap = (mindmapByKeys, nodeId, title, _id = null) => {
  if (!_id) {
    const nodeCreation = createNode(nodeId, title, mindmapByKeys);
    _id = nodeCreation._id;
    const node = nodeCreation.node;

    const newMindmapByKeys = {
      ...mindmapByKeys,
      [_id]: node,
    };

    if (nodeId) {
      newMindmapByKeys[nodeId] = {
        ...mindmapByKeys[nodeId],
        children: [...mindmapByKeys[nodeId].children, _id],
      };
    }

    return newMindmapByKeys;
  } else {
    const parent = mindmapByKeys[nodeId];
    if (!parent) {
      throw new Error(
        `Parent not found during addNodeToMindmap for nodeId: ${nodeId}`
      );
    }
    const group = null;
    const size = null;
    const level = `${parent.level}.${parent.children.length}`;
    const node = {
      _id,
      id: _id,
      title,
      level,
      children: [],
      parent: nodeId,
      size,
      group,
      links: { source: nodeId, target: _id, title },
    };

    const newMindmapByKeys = {
      ...mindmapByKeys,
      [_id]: node,
    };

    newMindmapByKeys[nodeId] = {
      ...mindmapByKeys[nodeId],
      children: [...mindmapByKeys[nodeId].children, _id],
    };

    return newMindmapByKeys;
  }
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
