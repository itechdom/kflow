import { createSlice } from "@reduxjs/toolkit";
import { addNodeToMindmap } from "./Model.Preview.feature.helper"; // Adjust import path accordingly
import KnowledgeGraph from "./knowledgeGraph"; // Import the graph management utility

// Initial state for the mindmap slice
const initialState = {
  mindmapByKeys: {},
  editedNode: "",
  knowledgeGraph: new KnowledgeGraph(),
  searchResults: [],
};

const mindmapSlice = createSlice({
  name: "mindmap",
  initialState,
  reducers: {
    setModel: (state, action) => {
      state.model = action.payload.model;
      state.mindmapByKeys = { ...action.payload.model.body };
    },
    addNode: (state, action) => {
      const { nodeId, title } = action.payload;
      state.mindmapByKeys = addNodeToMindmap(
        state.mindmapByKeys,
        nodeId,
        title
      );
      state.knowledgeGraph.addNode(nodeId, title);
    },
    editNode: (state, action) => {
      state.editedNode = action.payload.nodeId;
    },
    updateNode: (state, action) => {
      const { nodeId, key, value } = action.payload;
      state.mindmapByKeys[nodeId][key] = value;
      state.knowledgeGraph.addNode(nodeId, value); // Update the knowledge graph node
    },
    saveNode: (state) => {
      let newMindmap = {};
      Object.keys(state.mindmapByKeys).forEach((kn) => {
        const node = state.mindmapByKeys[kn];
        newMindmap[kn] = {
          ...node,
          links: {
            source: node.parent || node._id,
            target: node._id,
            title: node.title,
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
      state.knowledgeGraph.nodes.delete(nodeId); // Remove from the knowledge graph
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
    addEdge: (state, action) => {
      const { fromKey, toKey } = action.payload;
      state.knowledgeGraph.addEdge(fromKey, toKey);
      state.mindmapByKeys[fromKey].children.push(toKey);
      state.mindmapByKeys[toKey].parent = fromKey;
    },
    elaborateKnowledgeNode: (state, action) => {
      const { nodeId, apiKey } = action.payload;
      state.knowledgeGraph.elaborateKnowledge(nodeId, apiKey);
    },
    calculateShortestPathInGraph: (state, action) => {
      const { startKey, endKey } = action.payload;
      state.shortestPath = state.knowledgeGraph.calculateShortestPath(
        startKey,
        endKey
      );
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
  addEdge,
  elaborateKnowledgeNode,
  calculateShortestPathInGraph,
} = mindmapSlice.actions;

export default mindmapSlice.reducer;
