import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useImmer } from 'use-immer';
import debounce from 'lodash/debounce';
import { Input, Spinner } from 'reactstrap';
import {
  COLUMN_PROPS,
  ListFilterProvider,
  ListSortValueProvider,
  ListRefreshProvider,
  ListSortFuncProvider,
} from './constants';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Pagination from '../Pagination';
import './List.scss';

const ListWidget = ({
  columns,
  fetchData,
  initPage = 1,
  initSize = 10,
  initSorts = {},
  initFilter = {},
  deleteDialog,
  ...props
}) => {
  const [page, setPage] = useState(initPage);
  const [size, setSize] = useState(initSize);
  const [sorts, setSorts] = useImmer(initSorts);
  const [filter, setFilter] = useState(initFilter);
  const [isLoading, setIsLoading] = useState(true);
  const [{ count, rows }, setResponse] = useState({
    count: 0,
    rows: [],
  });

  const searchApi = React.useCallback(
    debounce(
      args => {
        setIsLoading(true);
        return fetchData(args)
          .then(resp => {
            setResponse(resp);
          })
          .finally(() => setIsLoading(false));
      },
      300,
      { trailing: true },
    ),
    [fetchData],
  );

  const refresh = React.useCallback(
    () => searchApi({ page, size, filter, sorts }),
    [searchApi, page, size, sorts, filter],
  );

  React.useEffect(() => {
    searchApi({ page, size, filter, sorts });
  }, [refresh]);

  const onSort = React.useCallback(
    (name, newDir) => {
      setSorts(draft => {
        // eslint-disable-next-line no-param-reassign
        draft[name] = newDir;
      });
    },
    [setSorts],
  );

  const tableHeader = React.useMemo(() => <TableHeader columns={columns} />, [
    columns,
  ]);

  const tableBody = React.useMemo(
    () => <TableBody columns={columns} rows={rows} />,
    [columns, rows],
  );

  const pagination = React.useMemo(
    () => (
      <div className="w-100 mt-2">
        <div className="d-flex align-items-center">
          <Input
            type="select"
            name="pageSize"
            className="mr-2"
            bsSize="sm"
            onChange={event => {
              setSize(Number(event.target.value));
            }}
            style={{ width: 'auto' }}
          >
            <option value={10}>10 / Page</option>
            <option value={20}>20 / Page</option>
            <option value={50}>50 / Page</option>
            <option value={100}>100 / Page</option>
          </Input>
          <Pagination
            currentPage={page}
            pageSize={size}
            total={count}
            setPage={setPage}
          />
          <div className="ml-2">Total: {count} records</div>
          {isLoading ? <Spinner className="ml-auto" /> : ''}
        </div>
      </div>
    ),
    [page, size, setSize, count, setPage, isLoading],
  );

  return (
    <ListRefreshProvider value={refresh}>
      <div className="wrapper">
        <div className="filter">
          <ListFilterProvider value={setFilter}>
            {props.children}
          </ListFilterProvider>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <ListSortValueProvider value={sorts}>
                <ListSortFuncProvider value={onSort}>
                  {tableHeader}
                </ListSortFuncProvider>
              </ListSortValueProvider>
            </thead>
            <tbody>{tableBody}</tbody>
          </table>
        </div>
        {pagination}
      </div>
      {deleteDialog}
    </ListRefreshProvider>
  );
};

ListWidget.propTypes = {
  columns: COLUMN_PROPS,
  deleteDialog: PropTypes.node,
  fetchData: PropTypes.func.isRequired,
  initPage: PropTypes.number,
  initSize: PropTypes.number,
  initSorts: PropTypes.object,
  initFilter: PropTypes.object,
  children: PropTypes.element,
};

export default ListWidget;
