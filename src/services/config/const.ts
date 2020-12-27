import joi from "joi";

/**
 * The static package key in a package.json config file
 */
export const PACKAGE_JSON_KEY = "monob";

/**
 * the joi scheme for a valid package.json with tool config
 */
export const PACKAGE_JSON_VALID_CONFIG_SCHEME = joi
  .object({
    [PACKAGE_JSON_KEY]: joi
      .object({
        packages: joi.array().items(joi.string()).required(),
      })
      .required(),
  })
  .unknown();
