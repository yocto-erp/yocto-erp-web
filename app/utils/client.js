const parser = require("ua-parser-js");

export function parseUserAgent(userAgent) {
  return parser(userAgent);
}
