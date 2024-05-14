//move this to kb service
import { v1 } from "uuid";
export const handleNodeAdd = (
  mindmapByKeys,
  setMindmapByKeys,
  nodeId,
  title
) => {
  const _id = v1();
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
      title,
      level:
        mindmapByKeys[nodeId].level +
        "." +
        mindmapByKeys[nodeId].children.length,
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
};

export const handleNodeEdit = (mindmapByKeys, setEditedNode, nodeId) => {
  setEditedNode(nodeId);
};

export const handleNodeUpdate = (
  mindmapByKeys,
  setMindmapByKeys,
  setEditedNode,
  updateModel,
  model,
  nodeId,
  { key, value }
) => {
  const newState = {
    ...mindmapByKeys,
    [nodeId]: {
      ...mindmapByKeys[nodeId],
      [key]: value,
    },
  };
  setMindmapByKeys(newState, () => {
    handleNodeSave(updateModel, model, newState);
    setEditedNode("");
  });
};

export const handleNodeSave = (updateModel, model, mindmapByKeys) => {
  //format mindmapByKeys
  let newMindmap = {};
  Object.keys(mindmapByKeys).map((kn) => {
    return (newMindmap[kn] = {
      ...mindmapByKeys[kn],
      links: {
        source: mindmapByKeys[kn].parent || mindmapByKeys[kn]._id,
        target: mindmapByKeys[kn]._id,
        title: mindmapByKeys[kn].title,
      },
    });
  });
  updateModel(model, { body: newMindmap });
};

export const handleNodeDelete = (mindmapByKeys, setMindmapByKeys, nodeId) => {
  const parent = mindmapByKeys[nodeId].parent;
  const {
    [nodeId]: {},
    ...mindmapByKeysWithoutNodeId
  } = mindmapByKeys;
  const newState = {
    ...mindmapByKeysWithoutNodeId,
    [parent]: {
      ...mindmapByKeys[parent],
      children: mindmapByKeys[parent].children.filter((id) => id !== nodeId),
    },
  };
  setMindmapByKeys(newState);
};

export const handleNodeSwap = (mindmapByKeys, nodeAId, nodeBId) => {};

export const handleNodeToggle = (mindmapByKeys, setMindmapByKeys, nodeId) => {
  let currentParent = mindmapByKeys[nodeId].parent;
  let parents = {};
  do {
    if (currentParent) {
      parents[currentParent] = {
        ...mindmapByKeys[currentParent],
        visible: true,
      };
    }
    currentParent = currentParent && mindmapByKeys[currentParent].parent;
  } while (currentParent);
  setMindmapByKeys((prevState) => {
    return {
      ...prevState,
      ...parents,
      [nodeId]: {
        ...prevState[nodeId],
        visible: !!!mindmapByKeys[nodeId].visible,
      },
    };
  });
};

export const handleNodeSearch = (mindmapByKeys, text) => {
  let found = Object.keys(mindmapByKeys)
    .filter((mk) => {
      const title = mindmapByKeys[mk].title;
      return title.toLowerCase().match(new RegExp(text.toLowerCase()));
    })
    .map((f) => mindmapByKeys[f]);
  return found;
};

export const comparePath = (currentLevel, visibleLevel) => {
  let visibleArray = visibleLevel.split(".");
  let currentArray = currentLevel.split(".");
  return currentArray.map((lev, index) => {
    return visibleArray[index] === lev;
  });
};

export const isVisible = (mindmapByKeys, visibleNodeKeys, nodeId) => {
  const currentLevel = mindmapByKeys[nodeId].level;
  let visible = true;
  if (visibleNodeKeys[currentLevel] === false) {
    visible = false;
  } else {
    visible =
      Object.keys(visibleNodeKeys).filter((visibleLevel) => {
        let res = comparePath(
          mindmapByKeys[nodeId].level,
          visibleLevel,
          visibleNodeKeys[visibleLevel]
        );
        return res.indexOf(false) === -1;
      }).length > 0;
  }
  return visible;
};

// Initial function to convert the whole object
export const convertObjectToMindmap = (obj, rootId, mindmapByKeys, setMindmapByKeys) => {
  console.log("CONVERSION", obj, rootId, mindmapByKeys, setMindmapByKeys);
  // Start traversing and adding nodes from the root
  traverseAndAddNodes(obj, rootId, mindmapByKeys, setMindmapByKeys);
};

export const traverseAndAddNodes = (
  obj,
  parentId,
  mindmapByKeys,
  setMindmapByKeys
) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Add the current key as a node
      const newNodeId = v1();
      handleNodeAdd(mindmapByKeys, setMindmapByKeys, parentId, key);

      // Traverse the children of the current node if it has any
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        traverseAndAddNodes(
          obj[key],
          newNodeId,
          mindmapByKeys,
          setMindmapByKeys
        );
      }
    }
  }
};


