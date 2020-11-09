import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Input, Spinner } from 'reactstrap';
import {
  COLUMN_PROPS,
  ListFilterProvider,
  ListRefreshProvider,
  ListStateProvider,
} from './constants';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Pagination from '../Pagination';
import './List.scss';
import Widget from '../Widget/Widget';

const ListWidget = ({
  columns,
  fetchData,
  initPage = 1,
  initSize = 10,
  initSorts = {},
  initFilter = {},
  deleteDialog,
  enableSelectColumn = false,
  pageHeader,
  ...props
}) => {
  const [page, setPage] = useState(initPage);
  const [size, setSize] = useState(initSize);
  const [sorts, setSorts] = useState(initSorts);
  const [filter, setFilter] = useState(initFilter);
  const [isLoading, setIsLoading] = useState(false);
  const [{ count, rows }, setResponse] = useState({
    count: 0,
    rows: [],
  });

  const [selectedList, setSelectedList] = useState({});

  const onSelectItem = useCallback(
    row => {
      setSelectedList(prevState => ({
        ...prevState,
        [`item${String(row.id)}`]: !prevState[`item${String(row.id)}`],
      }));
    },
    [setSelectedList],
  );

  const searchApi = React.useCallback(
    debounce(
      args => {
        setIsLoading(true);
        return fetchData(args)
          .then(resp => {
            setResponse({
              count: resp.count,
              rows: [...resp.rows],
            });
          })
          .finally(() => setIsLoading(false));
      },
      300,
      { trailing: true },
    ),
    [fetchData, setIsLoading, setResponse],
  );

  const onSort = React.useCallback(
    (name, newDir) => {
      setSorts({
        [name]: newDir,
      });
    },
    [setSorts],
  );

  const refresh = React.useCallback(
    () => searchApi({ page, size, filter, sorts }),
    [searchApi, page, size, sorts, filter],
  );

  const onSelectAll = React.useCallback(
    isSelectAll => {
      if (isSelectAll) {
        const newState = { ...selectedList };
        for (let i = 0; i < rows.length; i += 1) {
          newState[`item${String(rows[i].id)}`] = rows[i].id;
        }
        setSelectedList(newState);
      } else {
        setSelectedList({});
      }
    },
    [rows, selectedList],
  );

  const tableHeader = React.useMemo(
    () => (
      <TableHeader
        columns={columns}
        sorts={sorts}
        onSort={onSort}
        enableSelectColumn={enableSelectColumn}
        onSelectAll={onSelectAll}
      />
    ),
    [columns, sorts, enableSelectColumn, onSelectAll],
  );

  const tableBody = React.useMemo(
    () => (
      <TableBody
        columns={columns}
        rows={rows}
        enableSelectColumn={enableSelectColumn}
        onItemSelect={onSelectItem}
        selectedList={selectedList}
      />
    ),
    [columns, rows, enableSelectColumn, selectedList],
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

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <ListRefreshProvider value={refresh}>
      <ListStateProvider value={selectedList}>
        {pageHeader}
        <Widget>
          <div className="wrapper">
            <div className="filter">
              <ListFilterProvider value={setFilter}>
                {props.children}
              </ListFilterProvider>
            </div>
            <div className="table-responsive">
              <table className="table table-sm table-bordered table-striped">
                <thead>{tableHeader}</thead>
                <tbody>{tableBody}</tbody>
              </table>
            </div>
            {pagination}
          </div>
        </Widget>
        {deleteDialog}
      </ListStateProvider>
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
  enableSelectColumn: PropTypes.bool,
  pageHeader: PropTypes.node,
};

export default ListWidget;
