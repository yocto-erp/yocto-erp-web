import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const ListFilterContext = createContext({});
const ListSortFuncContext = createContext({});
const ListSortValueContext = createContext({});
const ListRefreshContext = createContext(null);

export function useListFilter() {
  return useContext(ListFilterContext);
}

export function useListFuncSort() {
  return useContext(ListSortFuncContext);
}

export function useListSortValue() {
  return useContext(ListSortValueContext);
}

export function useListRefreshContext() {
  return useContext(ListRefreshContext);
}

export const COLUMN_PROPS = PropTypes.arrayOf(
  PropTypes.shape({
    header: PropTypes.node.isRequired,
    data: PropTypes.string.isRequired,
    render: PropTypes.func,
    sort: PropTypes.shape({
      name: PropTypes.string,
      dir: PropTypes.string,
    }),
  }),
);

export const ListFilterProvider = ListFilterContext.Provider;
export const ListSortFuncProvider = ListSortFuncContext.Provider;
export const ListSortValueProvider = ListSortValueContext.Provider;
export const ListRefreshProvider = ListRefreshContext.Provider;
