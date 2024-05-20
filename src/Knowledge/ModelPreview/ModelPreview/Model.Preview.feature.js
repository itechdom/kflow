import { createSlice } from "@reduxjs/toolkit";
import { addNodeToMindmap } from "./Model.Preview.feature.helper"; // Adjust import path accordingly
import KnowledgeGraph from '../KnowledgeGraph/KnowledgeGraph'; // Import the graph management utility

const initialState = {
  mindmapByKeys: {},
  editedNode: "",
  knowledgeGraph: new KnowledgeGraph().serialize(), // Store serialized graph
  searchResults: [],
};

const mindmapSlice = createSlice({
  name: "mindmap",
  initialState,
  reducers: {
    setModel: (state, action) => {
      state.model = action.payload.model;
      state.mindmapByKeys = { ...action.payload.model.body };
      state.knowledgeGraph = KnowledgeGraph.deserialize(action.payload.model.knowledgeGraph).serialize();
    },
    addNode: (state, action) => {
      const { nodeId, title } = action.payload;
      state.mindmapByKeys = addNodeToMindmap(state.mindmapByKeys, nodeId, title);
      const graph = KnowledgeGraph.deserialize(state.knowledgeGraph);
      graph.addNode(nodeId, title);
      state.knowledgeGraph = graph.serialize();
    },
    editNode: (state, action) => {
      state.editedNode = action.payload.nodeId;
    },
    updateNode: (state, action) => {
      const { nodeId, key, value } = action.payload;
      state.mindmapByKeys[nodeId][key] = value;
      const graph = KnowledgeGraph.deserialize(state.knowledgeGraph);
      graph.addNode(nodeId, state.mindmapByKeys[nodeId].title); // Update the knowledge graph node
      state.knowledgeGraph = graph.serialize();
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
      state.model.knowledgeGraph = state.knowledgeGraph;
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
      const graph = KnowledgeGraph.deserialize(state.knowledgeGraph);
      graph.nodes.delete(nodeId); // Remove from the knowledge graph
      state.knowledgeGraph = graph.serialize();
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
        .filter((mk) => state.mindmapByKeys[mk].title.toLowerCase().match(regex))
        .map((f) => state.mindmapByKeys[f]);
    },
    addEdge: (state, action) => {
      const { fromKey, toKey } = action.payload;
      const graph = KnowledgeGraph.deserialize(state.knowledgeGraph);
      graph.addEdge(fromKey, toKey);
      state.knowledgeGraph = graph.serialize();
      state.mindmapByKeys[fromKey].children.push(toKey);
      state.mindmapByKeys[toKey].parent = fromKey;
    },
    elaborateKnowledgeNode: (state, action) => {
      const { nodeId, apiKey } = action.payload;
      const graph = KnowledgeGraph.deserialize(state.knowledgeGraph);
      graph.elaborateKnowledge(nodeId, async (prompt) => {
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            prompt: prompt,
            max_tokens: 150,
          }),
        });

        const data = await response.json();
        return data.choices[0].text.trim();
      });
      state.knowledgeGraph = graph.serialize();
    },
    calculateShortestPathInGraph: (state, action) => {
      const { startKey, endKey } = action.payload;
      const graph = KnowledgeGraph.deserialize(state.knowledgeGraph);
      state.shortestPath = graph.calculateShortestPath(startKey, endKey);
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
