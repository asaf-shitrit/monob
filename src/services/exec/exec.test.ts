import { IModule } from "../module/interface";
import { promises as fs } from "fs";
import child_process from "child_process";
import exec from "./exec";
import ms from "ms";

const MOCK_MODULE_PATH = "__tests__/mock-module";

jest.setTimeout(ms("1m"));

describe("exec.ts file", () => {
  describe("buildModule function", () => {
    beforeEach(() => {
      child_process.execSync(`npm --prefix ${MOCK_MODULE_PATH} run clean`);
    });

    afterAll(() => {
      child_process.execSync(`npm --prefix ${MOCK_MODULE_PATH} run clean`);
    });
    it("should build the mock module", async () => {
      const mockModule: IModule = {
        directory: MOCK_MODULE_PATH,
        path: `${MOCK_MODULE_PATH}/package.json`,
        name: "mock-module",
        dependencies: [],
      };
      const { stdout } = await exec.buildModule(mockModule);
      console.log(`output: ${stdout}`);

      await fs.stat(`${MOCK_MODULE_PATH}/index.js`);
    });
  });
});
