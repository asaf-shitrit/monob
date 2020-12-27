#!/usr/bin/env node

import { main } from "./monob";
import { flags } from "./cli";
import { Mode } from "./enum";
import logger from "./services/logger";

// get running mode from the process env NODE_ENV
// flag.
// TODO: add arg to override the running mode
const mode = process.env.NODE_ENV === "production" ? Mode.Production : Mode.Dev;

/**
 * the startup function of the tool,
 * bootstrapping the args & env then handing off
 * to the main routine, while catching any error
 * that it throws.
 */
const run = async () => {
  try {
    await main({
      ...flags,
      mode,
    });
  } catch (error) {
    logger.log(`Error occured - ${error.message}`);
  }
};
run();
