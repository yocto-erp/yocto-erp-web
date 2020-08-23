import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { COLUMN_PROPS } from './constants';

const TableBody = ({ columns, rows }) => {
  console.log('TableBody');
  return (
    <>
      {rows.map(row => (
        <tr key={row.id}>
          {columns.map(item => (
            <td
              key={item.data}
              style={
                item.width
                  ? { width: item.width ? `${item.width}` : 'inherit' }
                  : {}
              }
              className={classNames(item.class)}
            >
              {item.render ? item.render(row) : row[item.data]}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

TableBody.propTypes = {
  columns: COLUMN_PROPS,
  rows: PropTypes.array,
};

export default TableBody;
