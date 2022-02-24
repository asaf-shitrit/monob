import { parseFlags } from "./cli";

describe("cli.ts file", () => {
  describe("flags variable", () => {
    it("should contain default values with no argv", () => {
      const flags = parseFlags();
      expect(flags.verbose).toEqual(false);
      expect(flags.mode).toEqual("development");
    });
  });
});
