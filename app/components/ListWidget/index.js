import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { toast } from 'react-toastify';
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
import { useIsMounted } from '../../libs/hooks/useIsMounted';

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
  widgetClassname = '',
  ...props
}) => {
  const [page, setPage] = useState(initPage);
  const [size, setSize] = useState(initSize);
  const [sorts, setSorts] = useState(initSorts);
  const [filter, setFilter] = useState(initFilter);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useIsMounted();
  const [{ count, rows }, setResponse] = useState({
    count: 0,
    rows: [],
  });

  const [selectedList, setSelectedList] = useState({});

  const onSelectItem = useCallback(
    row => {
      setSelectedList(prevState => {
        if (prevState[`item${String(row.id)}`]) {
          // eslint-disable-next-line no-param-reassign
          delete prevState[`item${String(row.id)}`];
          return {
            ...prevState,
          };
        }
        return {
          ...prevState,
          [`item${String(row.id)}`]: row.id,
        };
      });
    },
    [setSelectedList],
  );

  const searchApi = React.useCallback(
    debounce(
      args => {
        setIsLoading(true);
        return fetchData(args).then(
          resp => {
            if (isMounted()) {
              setResponse({
                count: resp.count,
                rows: [...resp.rows],
              });
              setIsLoading(false);
            }
          },
          err => {
            if (isMounted()) {
              setIsLoading(false);
              toast.error(err.statusText || err.responseText);
            }
          },
        );
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

  const refresh = React.useCallback(
    () => searchApi({ page, size, filter, sorts }),
    [searchApi, page, size, sorts, filter],
  );

  const searchByFilter = React.useCallback(par => {
    setPage(1);
    setFilter(par);
  }, []);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <ListRefreshProvider value={refresh}>
      <ListStateProvider value={selectedList}>
        {pageHeader}
        {columns.length ? (
          <Widget className={widgetClassname}>
            <div className="wrapper">
              <div className="filter">
                <ListFilterProvider value={searchByFilter}>
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
        ) : null}
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
  widgetClassname: PropTypes.string,
};

export default ListWidget;
