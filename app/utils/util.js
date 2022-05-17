import isFunction from "lodash/isFunction";

export const isFunc = isFunction;
const { isArray } = Array;
export { isArray };
export const isArrayHasItem = items => Array.isArray(items) && items.length > 0;

export const isSafari =
  /constructor/i.test(window.HTMLElement) ||
  (function checkSafari(p) {
    return p.toString() === "[object SafariRemoteNotification]";
  })(
    !window.safari ||
      (typeof window.safari !== "undefined" && window.safari.pushNotification),
  );

export const hasText = str => str && str.length && str.trim().length;
