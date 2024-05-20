import { v4 as uuidv4 } from "uuid";

class KnowledgeGraph {
  constructor() {
    this.nodes = new Map();
  }

  addNode(key, value) {
    if (!this.nodes.has(key)) {
      this.nodes.set(key, { value, edges: new Set() });
    }
  }

  addEdge(fromKey, toKey) {
    if (this.nodes.has(fromKey) && this.nodes.has(toKey)) {
      this.nodes.get(fromKey).edges.add(toKey);
      this.nodes.get(toKey).edges.add(fromKey); // Assuming undirected graph
    }
  }

  getNode(key) {
    return this.nodes.get(key);
  }

  getNeighbors(key) {
    if (this.nodes.has(key)) {
      return Array.from(this.nodes.get(key).edges).map(neighborKey => ({
        key: neighborKey,
        value: this.nodes.get(neighborKey).value
      }));
    }
    return [];
  }

  getEdges() {
    const edges = [];
    this.nodes.forEach((node, key) => {
      node.edges.forEach(edgeKey => {
        edges.push({ from: key, to: edgeKey });
      });
    });
    return edges;
  }

  calculateDepth(key, visited = new Set()) {
    if (!this.nodes.has(key) || visited.has(key)) return 0;
    visited.add(key);
    const depths = Array.from(this.nodes.get(key).edges).map(edgeKey => this.calculateDepth(edgeKey, visited));
    return 1 + (depths.length ? Math.max(...depths) : 0);
  }

  calculateBreadth(key) {
    if (!this.nodes.has(key)) return 0;
    const queue = [key];
    const visited = new Set([key]);
    let breadth = 0;

    while (queue.length > 0) {
      const size = queue.length;
      breadth++;
      for (let i = 0; i < size; i++) {
        const nodeKey = queue.shift();
        this.nodes.get(nodeKey).edges.forEach(edgeKey => {
          if (!visited.has(edgeKey)) {
            visited.add(edgeKey);
            queue.push(edgeKey);
          }
        });
      }
    }

    return breadth;
  }

  calculateDegree(key) {
    if (!this.nodes.has(key)) return 0;
    return this.nodes.get(key).edges.size;
  }

  findPath(startKey, endKey) {
    if (!this.nodes.has(startKey) || !this.nodes.has(endKey)) return null;
    const queue = [[startKey]];
    const visited = new Set([startKey]);

    while (queue.length > 0) {
      const path = queue.shift();
      const nodeKey = path[path.length - 1];

      if (nodeKey === endKey) return path;

      this.nodes.get(nodeKey).edges.forEach(edgeKey => {
        if (!visited.has(edgeKey)) {
          visited.add(edgeKey);
          queue.push([...path, edgeKey]);
        }
      });
    }

    return null;
  }

  extractSubgraph(keys) {
    const subgraph = new Map();
    keys.forEach(key => {
      if (this.nodes.has(key)) {
        subgraph.set(key, { value: this.nodes.get(key).value, edges: new Set(this.nodes.get(key).edges) });
      }
    });
    return subgraph;
  }

  calculateShortestPath(startKey, endKey) {
    if (!this.nodes.has(startKey) || !this.nodes.has(endKey)) return null;
    const queue = [{ key: startKey, path: [startKey] }];
    const visited = new Set([startKey]);

    while (queue.length > 0) {
      const { key: nodeKey, path } = queue.shift();

      if (nodeKey === endKey) return path;

      this.nodes.get(nodeKey).edges.forEach(edgeKey => {
        if (!visited.has(edgeKey)) {
          visited.add(edgeKey);
          queue.push({ key: edgeKey, path: [...path, edgeKey] });
        }
      });
    }

    return null;
  }

  flattenGraph() {
    const uuidMap = new Map();
    const flattenedGraph = {};

    // Assign UUIDs to all nodes
    this.nodes.forEach((node, key) => {
      const uuid = uuidv4();
      uuidMap.set(key, uuid);
    });

    // Construct the flattened graph
    this.nodes.forEach((node, key) => {
      const uuid = uuidMap.get(key);
      flattenedGraph[uuid] = {
        value: node.value,
        children: Array.from(node.edges).map(edgeKey => uuidMap.get(edgeKey))
      };
    });

    return flattenedGraph;
  }

  compareGraphs(otherGraph) {
    const diff = {
      addedNodes: [],
      removedNodes: [],
      addedEdges: [],
      removedEdges: [],
    };

    // Compare nodes
    this.nodes.forEach((node, key) => {
      if (!otherGraph.nodes.has(key)) {
        diff.removedNodes.push(key);
      }
    });

    otherGraph.nodes.forEach((node, key) => {
      if (!this.nodes.has(key)) {
        diff.addedNodes.push(key);
      }
    });

    // Compare edges
    this.nodes.forEach((node, key) => {
      if (otherGraph.nodes.has(key)) {
        const nodeEdges = Array.from(node.edges);
        const otherNodeEdges = Array.from(otherGraph.nodes.get(key).edges);

        nodeEdges.forEach(edgeKey => {
          if (!otherNodeEdges.includes(edgeKey)) {
            diff.removedEdges.push({ from: key, to: edgeKey });
          }
        });

        otherNodeEdges.forEach(edgeKey => {
          if (!nodeEdges.includes(edgeKey)) {
            diff.addedEdges.push({ from: key, to: edgeKey });
          }
        });
      }
    });

    return diff;
  }

  async elaborateKnowledge(key, callOpenAI) {
    const node = this.getNode(key);
    if (!node) return;

    const prompt = `Elaborate on the following knowledge: "${node.value}"`;
    const elaboration = await callOpenAI(prompt);

    let elaborationTree;
    try {
      elaborationTree = JSON.parse(elaboration);
    } catch (error) {
      console.error("Failed to parse elaboration response as JSON:", error);
      // Add a node to indicate failure
      const errorKey = `${key}-elaboration-error-${uuidv4()}`;
      this.addNode(errorKey, "Elaboration failed: Invalid response from API");
      this.addEdge(key, errorKey);
      return;
    }

    const addTreeToGraph = (rootKey, tree) => {
      const newKey = `${rootKey}-${uuidv4()}`;
      this.addNode(newKey, tree.elaboration);
      this.addEdge(rootKey, newKey);
      tree.subtopics.forEach(subtopic => addTreeToGraph(newKey, subtopic));
    };

    addTreeToGraph(key, elaborationTree);
  }

  serialize() {
    const serializedNodes = {};
    this.nodes.forEach((node, key) => {
      serializedNodes[key] = {
        value: node.value,
        edges: Array.from(node.edges),
      };
    });
    return serializedNodes;
  }

  static deserialize(serializedData) {
    const graph = new KnowledgeGraph();
    if (!serializedData || typeof serializedData !== 'object') {
      console.warn("Invalid serialized data for deserialization", serializedData);
      return graph;
    }
    Object.keys(serializedData).forEach((key) => {
      graph.addNode(key, serializedData[key].value);
      serializedData[key].edges.forEach((edge) => {
        graph.addEdge(key, edge);
      });
    });
    return graph;
  }
}

export default KnowledgeGraph;
