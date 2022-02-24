import commander from "commander";
export interface CliFlags {
  verbose: boolean;
  mode: string;
}

/**
 * parses runtime flags from the argv.
 *
 */
export const parseFlags = () => {
  return (commander
    .option("-v, --verbose", "output verbose logs")
    .option(
      "-m, --mode",
      "the running mode (production/development)",
      "development"
    )
    .parse(process.argv) as unknown) as CliFlags;
};
