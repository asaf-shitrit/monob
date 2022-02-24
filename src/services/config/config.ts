/* Libs */
import path from "path";
import { promises as fs } from "fs";
import logger from "loglevel";

/* Errors */
import { RESOLVE_ERROR, INVALID_CONFIG, INVALID_PACKAGES } from "./error";

/* Static Values */
import { PACKAGE_JSON_KEY, PACKAGE_JSON_VALID_CONFIG_SCHEME } from "./const";

/* Types */
export interface IConfig {
  packages: string[];
}

type TConfigResolvingFunc = () => Promise<IConfig>;

/**
 * Returns a promise for a config which it tries to parse using
 * the local package.json file.
 *
 */
const tryUsingPackageJson = async (): Promise<IConfig> => {
  const filePath = path.join(process.cwd(), "package.json");

  // check if file exists (throws error if not)
  await fs.stat(filePath);

  // read file content
  const fileBuffer = await fs.readFile(filePath);

  // convert buffer to string and parse it as json
  const parsedPackageJsonFile = JSON.parse(fileBuffer.toString());

  // validate package.json scheme
  try {
    await PACKAGE_JSON_VALID_CONFIG_SCHEME.validateAsync(parsedPackageJsonFile);
  } catch (error) {
    throw INVALID_CONFIG;
  }

  // cast to config
  const config = parsedPackageJsonFile[PACKAGE_JSON_KEY] as IConfig;

  // check if packages are valid
  for (const pkg of config.packages) {
    logger.debug(`package - ${pkg}`);
    try {
      await fs.stat(pkg);
    } catch (error) {
      throw INVALID_PACKAGES;
    }
  }

  try {
    for await (const _ of config.packages.map((pkg) => {
      return fs.stat;
    })) {
    }
  } catch (error) {
    throw INVALID_PACKAGES;
  }

  // return after cast
  return config;
};

/**
 * The methods that monob is trying to resolve the config with.
 */
const RESOLVE_METHODS: TConfigResolvingFunc[] = [tryUsingPackageJson];

/**
 * Returns a promise for a config after trying to load it using
 * different strategies.
 */
export const getConfig = async (): Promise<IConfig> => {
  const methods = [...RESOLVE_METHODS];
  while (methods.length > 0) {
    try {
      const config = await methods[0]();
      return config;
    } catch (error) {
      methods.splice(0, 1);
    }
  }

  throw RESOLVE_ERROR;
};

export default {
  getConfig,
};
