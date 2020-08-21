import React from 'react';
import PropTypes from 'prop-types';
import { COLUMN_PROPS } from './constants';

const TableBody = ({ columns, rows }) => (
  <>
    {rows.map(row => (
      <tr key={row.id}>
        {columns.map(item => (
          <td key={item.data}>
            {item.render ? item.render(row) : row[item.data]}
          </td>
        ))}
      </tr>
    ))}
  </>
);

TableBody.propTypes = {
  columns: COLUMN_PROPS,
  rows: PropTypes.array,
};

export default TableBody;
