import args from "args";

args.option("verbose", "the verbosity of the program", false);

interface CliFlags {
  verbose: boolean;
}

export const flags = args.parse(process.argv) as CliFlags;
