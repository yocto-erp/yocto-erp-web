import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { toast } from 'react-toastify';
import { Input, Spinner } from 'reactstrap';
import {
  COLUMN_PROPS,
  ListActionProvider,
  ListFilterProvider,
  ListStateProvider,
} from './constants';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Pagination from '../Pagination';
import './List.scss';
import Widget from '../Widget/Widget';
import { useIsMounted } from '../../libs/hooks/useIsMounted';
import { useGridQueryParams } from '../../libs/hooks/useGridQueryParams';

const ListWidget = ({
  columns,
  fetchData,
  deleteDialog,
  enableSelectColumn = false,
  pageHeader,
  widgetClassname = '',
  mappingUrlData,
  initFilter,
  initSorts,
  ...props
}) => {
  const {
    queryObj,
    setPage,
    setSize,
    setSorts,
    setFilter,
  } = useGridQueryParams(mappingUrlData, { initFilter, initSorts });
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
        sorts={queryObj.sorts}
        onSort={onSort}
        enableSelectColumn={enableSelectColumn}
        onSelectAll={onSelectAll}
      />
    ),
    [columns, queryObj, enableSelectColumn, onSelectAll],
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
            value={queryObj.size}
          >
            <option value={10}>10 / Page</option>
            <option value={20}>20 / Page</option>
            <option value={50}>50 / Page</option>
            <option value={100}>100 / Page</option>
          </Input>
          <Pagination
            currentPage={queryObj.page}
            pageSize={queryObj.size}
            total={count}
            setPage={setPage}
          />
          <div className="ml-2">Total: {count} records</div>
          {isLoading ? <Spinner className="ml-auto" /> : ''}
        </div>
      </div>
    ),
    [queryObj, count, isLoading],
  );

  const refresh = React.useCallback(() => searchApi(queryObj), [
    searchApi,
    queryObj,
  ]);

  const searchByFilter = React.useCallback(
    par => {
      setPage(1);
      setFilter(par);
    },
    [setPage, setFilter],
  );

  const onDeleted = React.useCallback(
    id => {
      if (selectedList[`item${String(id)}`]) {
        delete selectedList[`item${String(id)}`];
        setSelectedList({ ...selectedList });
      }
      refresh();
    },
    [refresh, selectedList],
  );

  useEffect(() => {
    console.log(queryObj);
    searchApi(queryObj);
  }, [queryObj, searchApi]);

  return (
    <ListActionProvider value={{ refresh, onDeleted }}>
      <ListStateProvider value={selectedList}>
        {pageHeader}
        {columns.length ? (
          <Widget className={widgetClassname}>
            <div className="wrapper">
              <div className="filter">
                <ListFilterProvider
                  value={{ searchByFilter, filter: queryObj.filter }}
                >
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
    </ListActionProvider>
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
  mappingUrlData: PropTypes.func,
};

export default ListWidget;
