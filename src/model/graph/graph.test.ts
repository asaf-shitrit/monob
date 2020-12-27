import Graph from "./graph";

interface Value {
  val: string;
}

describe("Graph class", () => {
  let graph: Graph<Value>;
  beforeEach(() => {
    graph = new Graph();
  });
  describe("add Node function", () => {
    it("should add a node to the node map", () => {
      graph?.addNode("1", { val: "asaf" });
      expect(Object.values(graph.nodeMap).length).toBe(1);
    });
  });
  describe("add Edge function", () => {
    it("should add edge to the edge list", () => {
      graph?.addNode("1", { val: "asaf" });
      graph?.addNode("2", { val: "omri" });
      graph?.addEdge("1", "2");
      expect(graph.edgeList.length).toBe(1);
    });
  });
  describe("calculateGroupedTopologicalOrder function", () => {
    it("calculate a valid simple topological order without groupings", () => {
      graph?.addNode("1", { val: "asaf" });
      graph?.addNode("2", { val: "omri" });
      graph?.addEdge("1", "2");
      graph?.addNode("3", { val: "jena" });
      graph?.addEdge("2", "3");

      expect(graph.edgeList.length).toBe(2);
      expect(Object.values(graph.nodeMap).length).toBe(3);

      const topologicalOrder = graph?.calculateGroupedTopologicalOrder();
      expect(topologicalOrder.length).toBe(3);
      expect(topologicalOrder[0][0].val).toBe("asaf");
      expect(topologicalOrder[1][0].val).toBe("omri");
      expect(topologicalOrder[2][0].val).toBe("jena");
    });

    it("calculates a valid topological order with groupings", () => {
      const mockDep1: Value = { val: "shared-store" };
      const mockDep2: Value = { val: "shared-ui" };
      const mockDep3: Value = { val: "http-client" };
      const mockDep4: Value = { val: "admin-console" };

      [mockDep1, mockDep2, mockDep3, mockDep4].forEach((dep) => {
        graph?.addNode(dep.val, dep);
      });

      // store on http
      graph?.addEdge(mockDep3.val, mockDep1.val);
      // ui on http
      graph?.addEdge(mockDep3.val, mockDep2.val);
      // console on ui
      graph?.addEdge(mockDep2.val, mockDep4.val);
      // console on store
      graph?.addEdge(mockDep3.val, mockDep4.val);

      const topologicalOrder = graph?.calculateGroupedTopologicalOrder();
      expect(topologicalOrder[0][0]).toEqual(mockDep3);
      expect(topologicalOrder[1].length).toEqual(2);
      expect(topologicalOrder[2][0]).toEqual(mockDep4);
    });
  });
});
