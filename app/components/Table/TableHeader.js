import React from 'react';
import { COLUMN_PROPS, useTableSort, useTableSortValue } from './constants';

const SORT_ORDER = ['asc', 'desc', ''];

const TableHeader = ({ columns }) => {
  const onSort = useTableSort();
  const sorts = useTableSortValue();
  const onSortClick = name => {
    const currentDir = sorts[name];
    let dirIndex = SORT_ORDER.indexOf(currentDir);
    if (dirIndex < 2) {
      dirIndex += 1;
    } else {
      dirIndex = 0;
    }

    onSort(name, SORT_ORDER[dirIndex]);
  };

  const getSortProps = col => {
    let rs = {};
    if (col.sort) {
      const colSortDir =
        sorts[col.sort.name] && sorts[col.sort.name] !== ''
          ? `${sorts[col.sort.name]}`
          : '';
      rs = {
        onClick: () => onSortClick(col.sort.name),
        className: `sorting ${colSortDir}`,
      };
    }

    return rs;
  };

  return (
    <>
      <tr>
        {columns.map(item => (
          <th key={item.header} {...getSortProps(item)}>
            {item.header}
          </th>
        ))}
      </tr>
    </>
  );
};

TableHeader.propTypes = {
  columns: COLUMN_PROPS,
};

export default TableHeader;
