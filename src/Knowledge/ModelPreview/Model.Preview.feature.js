import { createSlice } from '@reduxjs/toolkit';
import { v1 as uuidv1 } from 'uuid';

// Helper functions

// Initial function to convert the whole object
export const convertObjectToMindmap = (obj, rootId, mindmapByKeys) => {
  const nodesToAdd = bulkTraverseAndAddNodes(mindmapByKeys, obj, rootId);
  nodesToAdd.forEach((node) => {
    mindmapByKeys = addNodeToMindmap(mindmapByKeys, node.parent, node.title);
  });
  return mindmapByKeys;
};

// Bulk traversal and addition of nodes
export const bulkTraverseAndAddNodes = (mindmapByKeys, obj, parentId) => {
  let nodesToAdd = [];

  if (typeof obj !== "object") return nodesToAdd;

  Object.keys(obj).forEach((key) => {
    const node = bulkHandleNodeAdd(mindmapByKeys, parentId, key);
    nodesToAdd.push(node);
    nodesToAdd = nodesToAdd.concat(
      bulkTraverseAndAddNodes(mindmapByKeys, obj[key], node._id)
    );
  });

  return nodesToAdd;
};

// Handle node addition without setting state immediately
export const bulkHandleNodeAdd = (mindmapByKeys, nodeId, title) => {
  const _id = uuidv1();
  const parent = mindmapByKeys[nodeId];
  let group = parent && parseInt(parent.level.split('.').join(''));
  let size = 20 / (parent && parent.level.split('.').length);

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

// Helper function to add node to mindmap without directly modifying state
export const addNodeToMindmap = (mindmapByKeys, nodeId, title) => {
  const _id = uuidv1();
  const parent = mindmapByKeys[nodeId];

  if (!parent) return mindmapByKeys;

  let group = parseInt(parent.level.split('.').join(''));
  let size = 20 / parent.level.split('.').length;

  return {
    ...mindmapByKeys,
    [nodeId]: {
      ...mindmapByKeys[nodeId],
      children: [...mindmapByKeys[nodeId].children, _id],
    },
    [_id]: {
      _id,
      id: _id,
      title,
      level: `${parent.level}.${parent.children.length}`,
      children: [],
      parent: nodeId,
      size,
      group,
      links: {
        source: parent,
        target: _id,
        title,
      },
    },
  };
};

// Compare paths for visibility
export const comparePath = (currentLevel, visibleLevel) => {
  const visibleArray = visibleLevel.split('.');
  const currentArray = currentLevel.split('.');
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

// Initial state for the mindmap slice
const initialState = {
  mindmapByKeys: {},
  editedNode: '',
};

// Redux slice for mindmap operations
const mindmapSlice = createSlice({
  name: 'mindmap',
  initialState,
  reducers: {
    addNode: (state, action) => {
      const { nodeId, title } = action.payload;
      state.mindmapByKeys = addNodeToMindmap(state.mindmapByKeys, nodeId, title);
    },
    editNode: (state, action) => {
      state.editedNode = action.payload.nodeId;
    },
    updateNode: (state, action) => {
      const { nodeId, key, value } = action.payload;
      state.mindmapByKeys[nodeId][key] = value;
    },
    saveNode: (state, action) => {
      const { model, updateModel } = action.payload;
      let newMindmap = {};
      Object.keys(state.mindmapByKeys).forEach(kn => {
        newMindmap[kn] = {
          ...state.mindmapByKeys[kn],
          links: {
            source: state.mindmapByKeys[kn].parent || state.mindmapByKeys[kn]._id,
            target: state.mindmapByKeys[kn]._id,
            title: state.mindmapByKeys[kn].title,
          },
        };
      });
      updateModel(model, { body: newMindmap });
    },
    deleteNode: (state, action) => {
      const { nodeId } = action.payload;
      const parent = state.mindmapByKeys[nodeId].parent;
      const { [nodeId]: _, ...mindmapByKeysWithoutNodeId } = state.mindmapByKeys;

      state.mindmapByKeys = {
        ...mindmapByKeysWithoutNodeId,
        [parent]: {
          ...state.mindmapByKeys[parent],
          children: state.mindmapByKeys[parent].children.filter(id => id !== nodeId),
        },
      };
    },
    toggleNode: (state, action) => {
      const { nodeId } = action.payload;
      let currentParent = state.mindmapByKeys[nodeId].parent;
      let parents = {};

      while (currentParent) {
        parents[currentParent] = { ...state.mindmapByKeys[currentParent], visible: true };
        currentParent = state.mindmapByKeys[currentParent].parent;
      }

      state.mindmapByKeys = {
        ...state.mindmapByKeys,
        ...parents,
        [nodeId]: {
          ...state.mindmapByKeys[nodeId],
          visible: !state.mindmapByKeys[nodeId].visible,
        },
      };
    },
    searchNodes: (state, action) => {
      const regex = new RegExp(action.payload.text.toLowerCase());
      return Object.keys(state.mindmapByKeys)
        .filter(mk => state.mindmapByKeys[mk].title.toLowerCase().match(regex))
        .map(f => state.mindmapByKeys[f]);
    },
  },
});

export const {
  addNode,
  editNode,
  updateNode,
  saveNode,
  deleteNode,
  toggleNode,
  searchNodes,
} = mindmapSlice.actions;

export default mindmapSlice.reducer;
