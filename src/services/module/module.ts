/* Libs */
import { promisify } from "util";
import glob from "glob";
import logger from "loglevel";
const asyncGlob = promisify(glob);

/* Local */
import { toPackageJsonGlobPattern } from "./util";
import { parseModuleFromPackageJson } from "./parser";

/* Types */
import { IModule } from "./interface";

/**
 *
 * @param packages a list of packages to resolve and flatten
 */
const resolveAndFlatModuleTree = async (
  packages: string[]
): Promise<IModule[]> => {
  logger.debug(`running on packages ${JSON.stringify(packages)}`);
  return Promise.all(packages.map(getModules)).then((packages) =>
    packages.flat()
  );
};

/**
 * Returns an array of modules it searched for in the given
 * folder path
 *
 * @param folderPath the folder path to search modules in
 */
const getModules = async (folderPath: string): Promise<IModule[]> => {
  logger.debug(`folder path - ${folderPath}`);
  const globPath = toPackageJsonGlobPattern(folderPath);
  const filePaths = await asyncGlob(globPath);

  // TODO: move out to util func
  // filter out package.json of libraries
  const filteredFilePaths = filePaths.filter(
    (path) => !path.includes("node_modules")
  );
  logger.debug(`found file paths - ${JSON.stringify(filteredFilePaths)}`);
  return Promise.all(
    filteredFilePaths.map((module) => parseModuleFromPackageJson(module))
  );
};

/**
 * Returns an array of modules with filtered dependencies that only
 * include local modules they are dependent on
 *
 * @param modules an array of local modules
 */
const filterOutNonLocalDependecies = (modules: IModule[]): IModule[] => {
  const allLocalModuleNames = modules.map((mod) => mod.name);
  return modules.map((mod) => {
    mod.dependencies = mod.dependencies.filter((dep) =>
      allLocalModuleNames.includes(dep)
    );

    return mod;
  });
};

export default {
  resolveAndFlatModuleTree,
  filterOutNonLocalDependecies,
};
