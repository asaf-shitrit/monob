import { IModule } from "../module/interface";
import { Graph } from "../../model";

const calculateDependencies = (modules: IModule[]): IModule[][] => {
  // calculate dependencies graph
  const graph = new Graph<IModule>();

  // add all nodes to the graph
  modules.forEach((mod) => graph.addNode(mod.name, mod));

  // add all edges to the graph
  modules.forEach((mod) => {
    mod.dependencies.forEach((dep) => {
      graph.addEdge(dep, mod.name);
    });
  });

  // calculate the steps we need to perform to build
  // all packages without getting dependencies conflict
  const groupedDependencies = graph.calculateGroupedTopologicalOrder();

  return groupedDependencies;
};

export default {
  calculateDependencies,
};
