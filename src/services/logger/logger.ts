import { Mode } from "../../enum";
import runtime from "../../runtime";

export enum LogLevel {
  VERBOSE,
  INFO,
}

const log = (text: string, level: LogLevel = LogLevel.INFO) => {
  console.log(`[x] ${text}`);
};

const logError = (error: Error) => {
  console.error(error);
};

export default {
  log,
  logError,
};
