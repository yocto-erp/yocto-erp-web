import React from 'react';
import PropTypes from 'prop-types';
import { COLUMN_PROPS, SORT_DIR } from './constants';

const SORT_ORDER = [SORT_DIR.ASC, SORT_DIR.DESC, ''];

const TableHeader = ({ columns, onSort, sorts }) => {
  console.log(sorts);
  const onSortClick = React.useCallback(
    name => {
      const currentDir = sorts[name];
      let dirIndex = SORT_ORDER.indexOf(currentDir);
      if (dirIndex < 2) {
        dirIndex += 1;
      } else {
        dirIndex = 0;
      }

      onSort(name, SORT_ORDER[dirIndex]);
    },
    [onSort, sorts],
  );

  const getSortProps = React.useCallback(
    col => {
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
    },
    [onSortClick, sorts],
  );

  return (
    <>
      <tr>
        {columns.map(item => (
          <th
            key={item.data}
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
  sorts: PropTypes.object,
  onSort: PropTypes.func,
};

export default TableHeader;
