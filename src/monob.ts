/* External Libs */
import logger from "loglevel";

/* Services */
import configSvc from "./services/config";
import moduleSvc from "./services/module";
import execSvc from "./services/exec";
import graphSvc from "./services/graph";

/* Etc */
import runtime from "./runtime";
import { IOptions } from "./interface";

/**
 * The main routine of the tool.
 *
 * @param options the options passed to the main routine
 */
export const main = async ({ mode, verbose }: IOptions) => {
  // startup message
  logger.info("Starting up monob");

  // set logger level from verbosity option
  verbose && logger.setLevel("DEBUG");

  // setup runtime
  runtime.mode = mode;

  logger.info(`Running in ${runtime.mode} mode`);

  // get monob config
  const { packages } = await configSvc.getConfig();
  logger.debug(`pacakges are ${packages}`);

  // get all modules for the given config and flatten them
  let modules = await moduleSvc.resolveAndFlatModuleTree(packages);

  // filter out all non local modules from the dep array of the modules
  modules = moduleSvc.filterOutNonLocalDependecies(modules);

  // calculate deps for all modules and get grouped modules build steps
  const moduleBuildSteps = graphSvc.calculateDependencies(modules);

  // start building module bundles in order
  for (let i = 0; i < moduleBuildSteps.length; i++) {
    logger.debug(`Executing step ${i + 1}`);
    await Promise.all(moduleBuildSteps[i].map(execSvc.buildModule));
  }

  // all well ends well :)
  logger.info("Finished building packages");
};
