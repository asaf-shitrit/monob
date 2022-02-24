#!/usr/bin/env node

/* Local Libs */
import { main } from "./monob";
import { parseFlags, CliFlags } from "./cli";

/* External Libs */
import logger from "loglevel";
import { Mode } from "./enum";

/**
 * the startup function of the tool,
 * bootstrapping the args & env then handing off
 * to the main routine, while catching any error
 * that it throws.
 */
const run = async (flags: CliFlags = parseFlags()) => {
  // infer mode from free-text flag
  let mode = Mode.Development;
  if (flags.mode === "production") {
    mode = Mode.Production;
  }

  try {
    await main({
      verbose: flags.verbose,
      mode,
    });
  } catch (error) {
    logger.error(`Error occured - ${error.message}`);
  }
};
run();
