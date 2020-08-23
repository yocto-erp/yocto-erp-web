import React from 'react';
import { COLUMN_PROPS, useListFuncSort, useListSortValue } from './constants';

const SORT_ORDER = ['asc', 'desc', ''];

const TableHeader = ({ columns }) => {
  const onSort = useListFuncSort();
  const sorts = useListSortValue();

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
    const rs = {};
    const className = [col.class];
    if (col.sort) {
      const colSortDir =
        sorts[col.sort.name] && sorts[col.sort.name] !== ''
          ? `${sorts[col.sort.name]}`
          : '';
      className.push(`sorting ${colSortDir}`);
      rs.onClick = () => onSortClick(col.sort.name);
    }
    rs.className = className.join(' ');

    return rs;
  };

  console.log('TableHeader');
  return (
    <>
      <tr>
        {columns.map(item => (
          <th
            key={item.header}
            {...getSortProps(item)}
            style={item.width ? { width: item.width } : {}}
          >
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
