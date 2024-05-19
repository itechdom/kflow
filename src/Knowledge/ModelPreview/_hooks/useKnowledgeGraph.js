import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useKnowledgeGraph = (apiKey) => {
  const [nodes, setNodes] = useState(new Map());

  const callOpenAI = async (prompt) => {
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
  };

  const addNode = useCallback((key, value) => {
    setNodes(prevNodes => {
      const newNodes = new Map(prevNodes);
      if (!newNodes.has(key)) {
        newNodes.set(key, { value, edges: new Set() });
      }
      return newNodes;
    });
  }, []);

  const addEdge = useCallback((fromKey, toKey) => {
    setNodes(prevNodes => {
      const newNodes = new Map(prevNodes);
      if (newNodes.has(fromKey) && newNodes.has(toKey)) {
        newNodes.get(fromKey).edges.add(toKey);
        newNodes.get(toKey).edges.add(fromKey); // Assuming undirected graph
      }
      return newNodes;
    });
  }, []);

  const getNode = useCallback((key) => {
    return nodes.get(key);
  }, [nodes]);

  const getNeighbors = useCallback((key) => {
    if (nodes.has(key)) {
      return Array.from(nodes.get(key).edges).map(neighborKey => ({
        key: neighborKey,
        value: nodes.get(neighborKey).value
      }));
    }
    return [];
  }, [nodes]);

  const getEdges = useCallback(() => {
    const edges = [];
    nodes.forEach((node, key) => {
      node.edges.forEach(edgeKey => {
        edges.push({ from: key, to: edgeKey });
      });
    });
    return edges;
  }, [nodes]);

  const calculateDepth = useCallback((key, visited = new Set()) => {
    if (!nodes.has(key) || visited.has(key)) return 0;
    visited.add(key);
    const depths = Array.from(nodes.get(key).edges).map(edgeKey => calculateDepth(edgeKey, visited));
    return 1 + (depths.length ? Math.max(...depths) : 0);
  }, [nodes]);

  const calculateBreadth = useCallback((key) => {
    if (!nodes.has(key)) return 0;
    const queue = [key];
    const visited = new Set([key]);
    let breadth = 0;

    while (queue.length > 0) {
      const size = queue.length;
      breadth++;
      for (let i = 0; i < size; i++) {
        const nodeKey = queue.shift();
        nodes.get(nodeKey).edges.forEach(edgeKey => {
          if (!visited.has(edgeKey)) {
            visited.add(edgeKey);
            queue.push(edgeKey);
          }
        });
      }
    }

    return breadth;
  }, [nodes]);

  const calculateDegree = useCallback((key) => {
    if (!nodes.has(key)) return 0;
    return nodes.get(key).edges.size;
  }, [nodes]);

  const findPath = useCallback((startKey, endKey) => {
    if (!nodes.has(startKey) || !nodes.has(endKey)) return null;
    const queue = [[startKey]];
    const visited = new Set([startKey]);

    while (queue.length > 0) {
      const path = queue.shift();
      const nodeKey = path[path.length - 1];

      if (nodeKey === endKey) return path;

      nodes.get(nodeKey).edges.forEach(edgeKey => {
        if (!visited.has(edgeKey)) {
          visited.add(edgeKey);
          queue.push([...path, edgeKey]);
        }
      });
    }

    return null;
  }, [nodes]);

  const extractSubgraph = useCallback((keys) => {
    const subgraph = new Map();
    keys.forEach(key => {
      if (nodes.has(key)) {
        subgraph.set(key, { value: nodes.get(key).value, edges: new Set(nodes.get(key).edges) });
      }
    });
    return subgraph;
  }, [nodes]);

  const calculateShortestPath = useCallback((startKey, endKey) => {
    if (!nodes.has(startKey) || !nodes.has(endKey)) return null;
    const queue = [{ key: startKey, path: [startKey] }];
    const visited = new Set([startKey]);

    while (queue.length > 0) {
      const { key: nodeKey, path } = queue.shift();

      if (nodeKey === endKey) return path;

      nodes.get(nodeKey).edges.forEach(edgeKey => {
        if (!visited.has(edgeKey)) {
          visited.add(edgeKey);
          queue.push({ key: edgeKey, path: [...path, edgeKey] });
        }
      });
    }

    return null;
  }, [nodes]);

  const flattenGraph = useCallback(() => {
    const uuidMap = new Map();
    const flattenedGraph = {};

    // Assign UUIDs to all nodes
    nodes.forEach((node, key) => {
      const uuid = uuidv4();
      uuidMap.set(key, uuid);
    });

    // Construct the flattened graph
    nodes.forEach((node, key) => {
      const uuid = uuidMap.get(key);
      flattenedGraph[uuid] = {
        value: node.value,
        children: Array.from(node.edges).map(edgeKey => uuidMap.get(edgeKey))
      };
    });

    return flattenedGraph;
  }, [nodes]);

  const compareGraphs = useCallback((otherGraph) => {
    const diff = {
      addedNodes: [],
      removedNodes: [],
      addedEdges: [],
      removedEdges: [],
    };

    // Compare nodes
    nodes.forEach((node, key) => {
      if (!otherGraph.nodes.has(key)) {
        diff.removedNodes.push(key);
      }
    });

    otherGraph.nodes.forEach((node, key) => {
      if (!nodes.has(key)) {
        diff.addedNodes.push(key);
      }
    });

    // Compare edges
    nodes.forEach((node, key) => {
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
  }, [nodes]);

  const elaborateKnowledge = useCallback(async (key) => {
    const node = nodes.get(key);
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
      addNode(errorKey, "Elaboration failed: Invalid response from API");
      addEdge(key, errorKey);
      return;
    }

    const addTreeToGraph = (rootKey, tree) => {
      const newKey = `${rootKey}-${uuidv4()}`;
      addNode(newKey, tree.elaboration);
      addEdge(rootKey, newKey);
      tree.subtopics.forEach(subtopic => addTreeToGraph(newKey, subtopic));
    };

    addTreeToGraph(key, elaborationTree);
  }, [nodes, addNode, addEdge, callOpenAI]);

  return {
    addNode,
    addEdge,
    getNode,
    getNeighbors,
    getEdges,
    calculateDepth,
    calculateBreadth,
    calculateDegree,
    findPath,
    extractSubgraph,
    calculateShortestPath,
    flattenGraph,
    compareGraphs,
    elaborateKnowledge,
  };
};

export default useKnowledgeGraph;
