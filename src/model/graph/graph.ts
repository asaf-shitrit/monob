/**
 * A node id type.
 */
type TNodeId = string;

/**
 * describes an edge object with source
 * and destination.
 */
interface IEdge {
  src: TNodeId;
  dst: TNodeId;
}

/**
 * a generic map of string key to any value.
 */
interface NodeMap<T> {
  [key: string]: T;
}

/**
 * A class that describes a directed graph
 * with functions that allow adding edges, nodes
 * and getting a grouped topological sort of the nodes.
 */
class Graph<T> {
  nodeMap: NodeMap<T> = {};
  edgeList: IEdge[] = [];

  /**
   * Adds a node to the graph, if it already exists
   * do nothing.
   *
   * @param id the unique id of the node
   * @param node the actual node value (can be anything)
   */
  addNode = (id: TNodeId, node: T) => {
    if (this.nodeMap.hasOwnProperty(id)) return;
    this.nodeMap[id] = node;
  };

  /**
   * Adds an edge between two nodes, if the edge already
   * exists do nothing.
   *
   * @param src the id of the source node
   * @param dst the id of the destination node
   */
  addEdge = (src: TNodeId, dst: TNodeId) => {
    const existingEdge = this.edgeList.find(
      (edge) => edge.src === src && edge.dst === dst
    );
    if (existingEdge) return;

    this.edgeList.push({ src, dst });
  };

  /**
   * Returns a grouped topological sort of the nodes and edges of the
   * graph.
   *
   * Thanks to BrandonAGr for giving me the idea of how to implement it
   * in https://stackoverflow.com/questions/4073119/topological-sort-with-grouping
   */
  calculateGroupedTopologicalOrder = (): T[][] => {
    let resultList: T[][] = [];

    // clone to remove js ref
    const nodeMap = { ...this.nodeMap };
    let edgeList = [...this.edgeList];

    // run while expecting to break
    while (true) {
      const nodeIdsWithNoEdgePointingToThem = Object.keys(nodeMap).filter(
        (nodeId) => {
          return edgeList.filter((edge) => edge.dst === nodeId).length === 0;
        }
      );

      // if no nodes were found break the while loop
      if (nodeIdsWithNoEdgePointingToThem.length === 0) {
        break;
      }

      const nodesWithNoEdgesPointingToThem = nodeIdsWithNoEdgePointingToThem.map(
        (nodeId) => nodeMap[nodeId]
      );

      // remove them from the node map and edges list
      nodeIdsWithNoEdgePointingToThem.forEach((nodeId) => {
        // delete the node
        delete nodeMap[nodeId];

        // remove all edges coming out of the node
        edgeList = edgeList.filter((edge) => edge.src !== nodeId);
      });

      // append the nodes to the result list
      resultList = [...resultList, nodesWithNoEdgesPointingToThem];
    }

    if (Object.keys(nodeMap).length > 0) {
      throw new Error("Couldn't calculate topological order");
    }

    return resultList;
  };
}

export default Graph;
