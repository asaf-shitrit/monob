import path from "path";

/**
 * Returns a glob (https://www.npmjs.com/package/glob)
 * pattern path from a given path.
 * @param folderPath the folder path to convert
 */
export const toPackageJsonGlobPattern = (folderPath: string) => {
  return path.join(folderPath, "**", "package.json");
};
