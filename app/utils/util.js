import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';

export const isFunc = isFunction;
export const isArrayHasItem = items => isArray(items) && items.length;
