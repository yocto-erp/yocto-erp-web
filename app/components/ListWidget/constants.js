import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import CreatedBy from "./CreatedBy";
import { formatDate } from "../../libs/utils/date.util";
import { commonMessage } from "../../containers/messages";

const ListFilterContext = createContext({});
const ListActionContext = createContext(null);
const ListStateContext = createContext(null);

export function useListFilter() {
  return useContext(ListFilterContext);
}

export function useListActionContext() {
  return useContext(ListActionContext);
}

export function useListStateContext() {
  return useContext(ListStateContext);
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
export const ListActionProvider = ListActionContext.Provider;
export const ListStateProvider = ListStateContext.Provider;

export const CreatedByColumn = {
  header: <FormattedMessage {...commonMessage.createdBy} />,
  data: "createdBy",
  sort: {
    name: "createdDate",
  },
  class: "min",
  render: row => {
    const { createdBy, createdDate } = row;
    return <CreatedBy user={createdBy} date={createdDate} />;
  },
};

export const LastUpdatedByColumn = {
  header: <FormattedMessage {...commonMessage.tableColHeaderLastModifiedBy} />,
  data: "lastUpdatedBy",
  sort: {
    name: "lastUpdatedDate",
  },
  class: "min",
  render: row => {
    const { lastUpdatedBy, lastUpdatedDate } = row;
    return <CreatedBy user={lastUpdatedBy} date={lastUpdatedDate} />;
  },
};

export const LastModifiedByColumn = {
  header: <FormattedMessage {...commonMessage.tableColHeaderLastModifiedBy} />,
  data: "lastModifiedBy",
  sort: {
    name: "lastModifiedDate",
  },
  class: "min",
  render: row => {
    const { lastModifiedBy, lastModifiedDate } = row;
    return <CreatedBy user={lastModifiedBy} date={lastModifiedDate} />;
  },
};

export const SORT_DIR = Object.freeze({
  DESC: "desc",
  ASC: "asc",
});

export const dateRender = date => {
  if (date && date.length) {
    return formatDate(new Date(date));
  }
  return null;
};
