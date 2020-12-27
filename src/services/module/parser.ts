/* Libs */
import { promises as fs } from "fs";
import path from "path";

/* Local */
import { IModule, IPackageJson } from "./interface";
import { Mode } from "../../enum";
import runtime from "../../runtime";

/**
 * Returns a module it parses from a given package.json file
 *
 * @param pkgPath the package.json file path
 */
export const parseModuleFromPackageJson = async (
  pkgPath: string
): Promise<IModule> => {
  // read file buffer
  const fileBuffer = await fs.readFile(pkgPath);

  // convert buffer to string and parse it as json
  const packageJson: IPackageJson = JSON.parse(
    fileBuffer.toString()
  ) as IPackageJson;

  const {
    dependencies = [],
    devDependencies = [],
    peerDependencies = [],
    name,
  } = packageJson;

  const aggregatedDeps = [];
  aggregatedDeps.push(...Object.keys({ ...dependencies, ...devDependencies }));

  // if mode is Dev also include peer deps
  if (runtime.mode === Mode.Dev) {
    aggregatedDeps.push(...Object.keys(peerDependencies));
  }

  // resolve directory from package path
  const directory = path.dirname(pkgPath);

  return {
    name,
    path: pkgPath,
    dependencies: aggregatedDeps,
    directory,
  };
};
