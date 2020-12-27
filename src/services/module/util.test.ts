import { toPackageJsonGlobPattern } from "./util";

describe("util.ts file", () => {
  describe("toPackageJsonGlobPattern function", () => {
    it("should return a valid glob path", () => {
      const folderPath = "packages";
      const expectedResult = "packages/**/package.json";
      expect(toPackageJsonGlobPattern(folderPath)).toBe(expectedResult);
    });
  });
});
