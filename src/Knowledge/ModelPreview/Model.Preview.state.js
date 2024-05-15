import { v1 as uuidv1 } from "uuid";

export const handleNodeAdd = (mindmapByKeys, setMindmapByKeys, nodeId, title) => {
  const _id = uuidv1();
  const parent = mindmapByKeys[nodeId];
  let group = parent && parseInt(parent.level.split(".").join(""));
  let size = 20 / (parent && parent.level.split(".").length);
  const newState = {
    ...mindmapByKeys,
    [nodeId]: {
      ...mindmapByKeys[nodeId],
      children: [...mindmapByKeys[nodeId].children, _id],
    },
    [_id]: {
      _id,
      id: _id,
      title: title,
      level: mindmapByKeys[nodeId].level + "." + mindmapByKeys[nodeId].children.length,
      children: [],
      parent: nodeId,
      size,
      group,
      links: {
        source: parent,
        target: _id,
        title: title,
      },
    },
  };
  setMindmapByKeys(newState);
  return newState;
};

export const handleNodeEdit = (mindmapByKeys, setEditedNode, nodeId) => {
  setEditedNode(nodeId);
};

export const handleNodeUpdate = (mindmapByKeys, setMindmapByKeys, setEditedNode, updateModel, model, nodeId, { key, value }) => {
  const newState = {
    ...mindmapByKeys,
    [nodeId]: {
      ...mindmapByKeys[nodeId],
      [key]: value,
    },
  };
  setMindmapByKeys(newState);
  handleNodeSave(updateModel, model, newState);
  setEditedNode("");
};

export const handleNodeSave = (updateModel, model, mindmapByKeys) => {
  let newMindmap = {};
  Object.keys(mindmapByKeys).forEach((kn) => {
    newMindmap[kn] = {
      ...mindmapByKeys[kn],
      links: {
        source: mindmapByKeys[kn].parent || mindmapByKeys[kn]._id,
        target: mindmapByKeys[kn]._id,
        title: mindmapByKeys[kn].title,
      },
    };
  });
  updateModel(model, { body: newMindmap });
};

export const handleNodeDelete = (mindmapByKeys, setMindmapByKeys, nodeId) => {
  const parent = mindmapByKeys[nodeId].parent;
  const { [nodeId]: _, ...mindmapByKeysWithoutNodeId } = mindmapByKeys;
  const newState = {
    ...mindmapByKeysWithoutNodeId,
    [parent]: {
      ...mindmapByKeys[parent],
      children: mindmapByKeys[parent].children.filter((id) => id !== nodeId),
    },
  };
  setMindmapByKeys(newState);
};

export const handleNodeToggle = (mindmapByKeys, setMindmapByKeys, nodeId) => {
  let currentParent = mindmapByKeys[nodeId].parent;
  let parents = {};
  while (currentParent) {
    parents[currentParent] = { ...mindmapByKeys[currentParent], visible: true };
    currentParent = mindmapByKeys[currentParent].parent;
  }
  setMindmapByKeys((prevState) => ({
    ...prevState,
    ...parents,
    [nodeId]: {
      ...prevState[nodeId],
      visible: !mindmapByKeys[nodeId].visible,
    },
  }));
};

export const handleNodeSearch = (mindmapByKeys, text) => {
  const regex = new RegExp(text.toLowerCase());
  return Object.keys(mindmapByKeys)
    .filter((mk) => mindmapByKeys[mk].title.toLowerCase().match(regex))
    .map((f) => mindmapByKeys[f]);
};

export const comparePath = (currentLevel, visibleLevel) => {
  const visibleArray = visibleLevel.split(".");
  const currentArray = currentLevel.split(".");
  return currentArray.map((lev, index) => visibleArray[index] === lev);
};

export const isVisible = (mindmapByKeys, visibleNodeKeys, nodeId) => {
  const currentLevel = mindmapByKeys[nodeId].level;
  if (visibleNodeKeys[currentLevel] === false) return false;
  return Object.keys(visibleNodeKeys).some((visibleLevel) => {
    const res = comparePath(mindmapByKeys[nodeId].level, visibleLevel, visibleNodeKeys[visibleLevel]);
    return res.every(Boolean);
  });
};

// Initial function to convert the whole object
export const convertObjectToMindmap = (obj, rootId, mindmapByKeys, setMindmapByKeys) => {
  const nodesToAdd = bulkTraverseAndAddNodes(mindmapByKeys, obj, rootId);
  let newState = { ...mindmapByKeys };
  nodesToAdd.forEach((node) => {
    newState = handleNodeAdd(newState, () => {}, node.parent, node.title);
  });
  setMindmapByKeys(newState);
};

// Bulk traversal and addition of nodes
export const bulkTraverseAndAddNodes = (mindmapByKeys, obj, parentId) => {
  let nodesToAdd = [];

  if (typeof obj !== "object") return nodesToAdd;

  Object.keys(obj).forEach((key) => {
    const node = bulkHandleNodeAdd(mindmapByKeys, parentId, key);
    nodesToAdd.push(node);
    nodesToAdd = nodesToAdd.concat(bulkTraverseAndAddNodes(mindmapByKeys, obj[key], node._id));
  });

  return nodesToAdd;
};

// Handle node addition without setting state immediately
export const bulkHandleNodeAdd = (mindmapByKeys, nodeId, title) => {
  const _id = uuidv1();
  const parent = mindmapByKeys[nodeId];
  let group = parent && parseInt(parent.level.split(".").join(""));
  let size = 20 / (parent && parent.level.split(".").length);

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