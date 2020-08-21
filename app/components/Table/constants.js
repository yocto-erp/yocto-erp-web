import PropTypes from 'prop-types';
import { createContext, useContext } from 'react';

export const COLUMN_PROPS = PropTypes.arrayOf(
  PropTypes.shape({
    header: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
    render: PropTypes.func,
    sort: PropTypes.shape({
      name: PropTypes.string,
      dir: PropTypes.string,
    }),
  }),
);

const TableFilterContext = createContext({});
const TableSortContext = createContext({});
const TableSortValueContext = createContext({});

export function useTableFilter() {
  return useContext(TableFilterContext);
}

export function useTableSort() {
  return useContext(TableSortContext);
}

export function useTableSortValue() {
  return useContext(TableSortValueContext);
}

export const TableFilterProvider = TableFilterContext.Provider;
export const TableSortProvider = TableSortContext.Provider;
export const TableSortValueProvider = TableSortValueContext.Provider;
