import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import CreatedBy from './CreatedBy';

const ListFilterContext = createContext({});
const ListRefreshContext = createContext(null);

export function useListFilter() {
  return useContext(ListFilterContext);
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
export const ListRefreshProvider = ListRefreshContext.Provider;

export const CreatedByColumn = {
  header: <span className="text-nowrap">Created By</span>,
  data: 'createdBy',
  sort: {
    name: 'createdDate',
  },
  width: '1px',
  render: row => {
    const { createdBy, createdDate } = row;
    return <CreatedBy user={createdBy} date={createdDate} />;
  },
};

export const SORT_DIR = Object.freeze({
  DESC: 'desc',
  ASC: 'asc',
});
