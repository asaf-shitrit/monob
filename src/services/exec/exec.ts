/* Libs */
import child_process from "child_process";
import util from "util";
const asyncExec = util.promisify(child_process.exec);

/* External Libs */
import logger from "loglevel";

/* Types */
import { IModule } from "../module/interface";

/**
 *
 * Return promise to return when building is finished
 *
 * @param module the module to be built
 */
const buildModule = async (module: IModule) => {
  logger.info(`running build in ${module.directory}`);

  // inherit calling process env variables
  return asyncExec(`npm --prefix ${module.directory} run build`, {
    env: process.env,
  });
};

export default {
  buildModule,
};
