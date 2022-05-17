import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { COLUMN_PROPS, SORT_DIR } from "./constants";
import useUser from "../../libs/hooks/useUser";
import { isArrayHasItem } from "../../utils/util";

const SORT_ORDER = [SORT_DIR.ASC, SORT_DIR.DESC, ""];

const TableHeader = ({
  columns,
  onSort,
  sorts,
  enableSelectColumn = false,
  onSelectAll,
}) => {
  const { isHasAnyPermission } = useUser();
  const onSortClick = React.useCallback(
    name => {
      const currentDir = sorts && sorts[name];
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
          sorts && sorts[col.sort.name] && sorts[col.sort.name] !== ""
            ? `${sorts[col.sort.name]}`
            : "";
        className.push(`sorting ${colSortDir}`);
        rs.onClick = () => onSortClick(col.sort.name);
      }
      rs.className = className.join(" ");

      return rs;
    },
    [onSortClick, sorts],
  );

  return (
    <tr>
      {enableSelectColumn ? (
        <th className="min text-center">
          Select
          <br />
          <Button
            type="button"
            color="link"
            size="sm"
            className="text-success"
            style={{ padding: "2px" }}
            onClick={() => onSelectAll(true)}
          >
            ALL
          </Button>
          |
          <Button
            type="button"
            color="link"
            size="sm"
            className="text-danger"
            style={{ padding: "2px" }}
            onClick={() => onSelectAll(false)}
          >
            None
          </Button>
        </th>
      ) : null}
      {columns.map(item => {
        if (
          isArrayHasItem(item.permissions) &&
          !isHasAnyPermission({ permission: item.permissions })
        )
          return null;
        return (
          <th
            key={item.data}
            {...getSortProps(item)}
            style={item.width ? { width: item.width } : {}}
          >
            {item.header}
          </th>
        );
      })}
    </tr>
  );
};

TableHeader.propTypes = {
  columns: COLUMN_PROPS,
  sorts: PropTypes.object,
  onSort: PropTypes.func,
  enableSelectColumn: PropTypes.bool,
  onSelectAll: PropTypes.func,
};

export default TableHeader;
