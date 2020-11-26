import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';

export const isFunc = isFunction;
export const isArrayHasItem = items => isArray(items) && items.length;
export const isSafari =
  /constructor/i.test(window.HTMLElement) ||
  (function(p) {
    return p.toString() === '[object SafariRemoteNotification]';
  })(
    !window.safari ||
      (typeof window.safari !== 'undefined' && window.safari.pushNotification),
  );
