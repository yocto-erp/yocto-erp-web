import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { COLUMN_PROPS } from './constants';
import { isFunc } from '../../utils/util';

const TableBody = ({
  columns,
  rows,
  enableSelectColumn = false,
  selectedList = {},
  onItemSelect,
}) => (
  <>
    {rows.map(row => (
      <tr key={row.id}>
        {enableSelectColumn ? (
          <td className="min text-center">
            <div className="form-check">
              <input
                className="form-check-input position-static"
                type="checkbox"
                id={row.id}
                value="1"
                aria-label="..."
                defaultChecked={selectedList[`item${String(row.id)}`]}
                checked={!!selectedList[`item${String(row.id)}`]}
                onChange={() => isFunc(onItemSelect) && onItemSelect(row)}
              />
            </div>
          </td>
        ) : null}
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

TableBody.propTypes = {
  columns: COLUMN_PROPS,
  rows: PropTypes.array,
  enableSelectColumn: PropTypes.bool,
  selectedList: PropTypes.object,
  onItemSelect: PropTypes.func,
};

export default TableBody;
