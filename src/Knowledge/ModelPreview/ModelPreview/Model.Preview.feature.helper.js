import { v1 as uuidv1 } from "uuid";

// Centralized function to create a new node
const createNode = (nodeId, title, mindmapByKeys) => {
  const _id = uuidv1();
  let group = 0;
  let size = "20";
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

// Function to convert object to mindmap and collapse all nodes
export const convertObjectToMindmap = (obj, rootId, mindmapByKeys) => {
  const nodesToAdd = bulkTraverseAndAddNodes(mindmapByKeys, obj, rootId);
  nodesToAdd.forEach((node) => {
    mindmapByKeys = addNodeToMindmap(
      mindmapByKeys,
      node.parent,
      node.title,
      node._id
    );
  });

  const rootNodes = Object.values(mindmapByKeys).filter((node) => !node.parent);
  rootNodes.forEach((node) => {
    mindmapByKeys = collapseAllNodes(mindmapByKeys, node._id);
  });

  return mindmapByKeys;
};

export const bulkTraverseAndAddNodes = (mindmapByKeys, obj, parentId) => {
  let nodesToAdd = [];

  if (obj instanceof Array) {
    obj.forEach((item, index) => {
      const { _id, node } = createNode(parentId, item, mindmapByKeys);
      nodesToAdd.push(node);
      mindmapByKeys = addNodeToMindmap(mindmapByKeys, parentId, index, _id);
      nodesToAdd = nodesToAdd.concat(
        bulkTraverseAndAddNodes(mindmapByKeys, item, _id)
      );
    });
    console.log("NODES TO ADD", nodesToAdd);

    return nodesToAdd;
  }
  if (typeof obj !== "object") {
    return nodesToAdd;
  }

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

// Function to collapse all nodes except the specified one
export const collapseAllNodes = (mindmapByKeys, nodeId, exceptionNodeId) => {
  const node = mindmapByKeys[nodeId];
  if (node) {
    mindmapByKeys[nodeId] = {
      ...node,
      __rd3t: { collapsed: nodeId !== exceptionNodeId },
    };
    node.children.forEach((childId) => {
      mindmapByKeys = collapseAllNodes(mindmapByKeys, childId, exceptionNodeId);
    });
  }
  return mindmapByKeys;
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
