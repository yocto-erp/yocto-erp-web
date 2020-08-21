import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Spinner } from 'reactstrap';
import { useImmer } from 'use-immer';
import Pagination from '../Pagination';
import './table.scss';
import TableBody from './TableBody';
import {
  TableSortProvider,
  TableFilterProvider,
  TableSortValueProvider,
  COLUMN_PROPS,
} from './constants';
import TableHeader from './TableHeader';

function Table({
  columns,
  fetchData,
  initialPage = 1,
  initialSize = 10,
  initialSorts = {},
  initialFilter = {},
  filterComponent,
  ...props
}) {
  const fetchRequestId = React.useRef(1);
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);
  const [isLoading, setIsLoading] = useState(true);
  const [sorts, setSorts] = useImmer(initialSorts);
  const [filter, setFilter] = useState(initialFilter);
  const [{ count, rows }, setResponse] = useState({
    count: 0,
    rows: [],
  });

  React.useEffect(() => {
    fetchRequestId.current += 1;
    const fetchId = fetchRequestId.current;
    setIsLoading(true);
    fetchData({ page, size })
      .then(resp => {
        if (fetchId === fetchRequestId.current) {
          setResponse(resp);
        }
      })
      .finally(() => setIsLoading(false));
  }, [fetchData, page, size, sorts, filter]);

  const onSort = React.useCallback(
    (name, newDir) => {
      setSorts(draft => {
        // eslint-disable-next-line no-param-reassign
        draft[name] = newDir;
      });
    },
    [setSorts],
  );

  const onFilter = React.useCallback(
    _filter => {
      setFilter(_filter);
    },
    [setFilter],
  );

  const totalCols = columns.length;

  const tableHeader = React.useMemo(() => <TableHeader columns={columns} />, [
    columns,
  ]);

  return (
    <div className="wrapper">
      <div className="filter">
        <TableFilterProvider value={onFilter}>
          {props.children}
        </TableFilterProvider>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <TableSortValueProvider value={sorts}>
              <TableSortProvider value={onSort}>
                {tableHeader}
              </TableSortProvider>
            </TableSortValueProvider>
          </thead>
          <tbody>
            <TableBody columns={columns} rows={rows} />
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={totalCols} />
            </tr>
          </tfoot>
        </table>
      </div>
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
    </div>
  );
}

Table.propTypes = {
  columns: COLUMN_PROPS,
  filterComponent: PropTypes.func,
  fetchData: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
  initialSize: PropTypes.number,
  initialSorts: PropTypes.object,
  initialFilter: PropTypes.object,
  children: PropTypes.element,
};

export default Table;
