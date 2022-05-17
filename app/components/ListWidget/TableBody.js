import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import { COLUMN_PROPS } from "./constants";
import { isArrayHasItem, isFunc } from "../../utils/util";
import useUser from "../../libs/hooks/useUser";

const TableBody = ({
  columns,
  rows,
  enableSelectColumn = false,
  selectedList = {},
  onItemSelect,
}) => {
  const { isHasAnyPermission } = useUser();
  return (
    <>
      {rows.map(row => (
        <tr key={row.id || uuidv4()}>
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
          {columns.map(item => {
            if (
              isArrayHasItem(item.permissions) &&
              !isHasAnyPermission({ permission: item.permissions })
            )
              return null;
            return (
              <td
                key={item.data}
                style={
                  item.width
                    ? { width: item.width ? `${item.width}` : "inherit" }
                    : {}
                }
                className={classNames(item.class)}
              >
                {item.render ? item.render(row) : row[item.data]}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
};

TableBody.propTypes = {
  columns: COLUMN_PROPS,
  rows: PropTypes.array,
  enableSelectColumn: PropTypes.bool,
  selectedList: PropTypes.object,
  onItemSelect: PropTypes.func,
};

export default TableBody;
