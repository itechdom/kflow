import { createSlice } from "@reduxjs/toolkit";
// Helper functions
import {
  addNodeToMindmap
} from './Model.Preview.feature.helper'; // Adjust import path accordingly

// Initial state for the mindmap slice
const initialState = {
  mindmapByKeys: {},
  editedNode: "",
};

const mindmapSlice = createSlice({
  name: "mindmap",
  initialState,
  reducers: {
    setModel: (state, action) => {
      state.model = action.payload.model;
      state.mindmapByKeys = action.payload.model.body;
    },
    addNode: (state, action) => {
      const { nodeId, title } = action.payload;
      state.mindmapByKeys = addNodeToMindmap(
        state.mindmapByKeys,
        nodeId,
        title
      );
    },
    editNode: (state, action) => {
      state.editedNode = action.payload.nodeId;
    },
    updateNode: (state, action) => {
      const { nodeId, key, value } = action.payload;
      state.mindmapByKeys[nodeId][key] = value;
    },
    saveNode: (state) => {
      let newMindmap = {};
      Object.keys(state.mindmapByKeys).forEach((kn) => {
        newMindmap[kn] = {
          ...state.mindmapByKeys[kn],
          links: {
            source:
              state.mindmapByKeys[kn].parent || state.mindmapByKeys[kn]._id,
            target: state.mindmapByKeys[kn]._id,
            title: state.mindmapByKeys[kn].title,
          },
        };
      });
      state.model.body = newMindmap;
    },
    deleteNode: (state, action) => {
      const { nodeId } = action.payload;
      const parent = state.mindmapByKeys[nodeId].parent;
      const { [nodeId]: _, ...mindmapByKeysWithoutNodeId } =
        state.mindmapByKeys;

      state.mindmapByKeys = {
        ...mindmapByKeysWithoutNodeId,
        [parent]: {
          ...state.mindmapByKeys[parent],
          children: state.mindmapByKeys[parent].children.filter(
            (id) => id !== nodeId
          ),
        },
      };
    },
    toggleNode: (state, action) => {
      const { nodeId } = action.payload;
      let currentParent = state.mindmapByKeys[nodeId].parent;
      let parents = {};

      while (currentParent) {
        parents[currentParent] = {
          ...state.mindmapByKeys[currentParent],
          visible: true,
        };
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
      state.searchResults = Object.keys(state.mindmapByKeys)
        .filter((mk) =>
          state.mindmapByKeys[mk].title.toLowerCase().match(regex)
        )
        .map((f) => state.mindmapByKeys[f]);
    },
  },
});

export const {
  setModel,
  addNode,
  editNode,
  updateNode,
  saveNode,
  deleteNode,
  toggleNode,
  searchNodes,
} = mindmapSlice.actions;

export default mindmapSlice.reducer;