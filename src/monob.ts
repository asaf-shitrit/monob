import configSvc from "./services/config";
import moduleSvc from "./services/module";
import execSvc from "./services/exec";
import graphSvc from "./services/graph";
import logger from "./services/logger";
import { Mode } from "./enum";
import runtime from "./runtime";

interface Options {
  verbose: boolean;
  mode: Mode;
}

export const main = async ({ mode, verbose }: Options) => {
  // setup runtime
  runtime.mode = mode;

  // get monob config
  const { packages } = await configSvc.getConfig();
  logger.log(`packages are ${packages}`);

  // get all modules for the given config and flatten them
  let modules = await moduleSvc.resolveAndFlatModuleTree(packages);
  // filter out all non local modules from the dep array of the modules
  modules = moduleSvc.filterOutNonLocalDependecies(modules);

  // calculate deps for all modules and get grouped modules build steps
  const moduleBuildSteps = graphSvc.calculateDependencies(modules);

  // start building module bundles in order
  for (let i = 0; i < moduleBuildSteps.length; i++) {
    logger.log(`Executing step ${i + 1}`);
    await Promise.all(moduleBuildSteps[i].map(execSvc.buildModule));
  }

  logger.log("Finished building packages");
};
