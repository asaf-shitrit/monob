import child_process from "child_process";
import util from "util";
import logger from "../logger";
import { IModule } from "../module/interface";
const asyncExec = util.promisify(child_process.exec);

/**
 *
 * Return promise to return when building is finished
 *
 * @param module the module to be built
 */
const buildModule = async (module: IModule) => {
  logger.log(`running build in ${module.directory}`);

  // inherit calling process env variables
  return asyncExec(`npm --prefix ${module.directory} run build`, {
    env: process.env,
  });
};

export default {
  buildModule,
};
