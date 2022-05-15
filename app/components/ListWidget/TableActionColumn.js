import React from "react";
import PropTypes from "prop-types";
import { isArray, isFunction } from "lodash";
import { Button, ButtonGroup, ButtonToolbar } from "reactstrap";
import useUser from "../../libs/hooks/useUser";

const TableActionColumns = ({
  onEdit,
  editPermission,
  onView,
  viewPermission,
  onDelete,
  deletePermission,
  buttons = [],
  children,
}) => {
  const { isHasAnyPermission } = useUser();
  const buttonEls = [];
  if (isArray(buttons)) {
    buttons.forEach(t => buttonEls.push(t));
  }
  if (
    isFunction(onView) &&
    (!viewPermission || isHasAnyPermission({ permission: viewPermission }))
  ) {
    buttonEls.push(
      <Button key="view" onClick={onView} color="info">
        <i className="fi flaticon-view" />
      </Button>,
    );
  }
  if (
    isFunction(onEdit) &&
    (!editPermission || isHasAnyPermission({ permission: editPermission }))
  ) {
    buttonEls.push(
      <Button key="edit" onClick={onEdit} color="warning">
        <i className="fi flaticon-edit" />
      </Button>,
    );
  }
  if (
    isFunction(onDelete) &&
    (!deletePermission || isHasAnyPermission({ permission: deletePermission }))
  ) {
    buttonEls.push(
      <Button key="delete" onClick={onDelete} color="danger" title="Delete">
        <i className="fi flaticon-trash" />
      </Button>,
    );
  }

  return (
    <ButtonToolbar className="">
      <ButtonGroup size="sm">
        {children}
        {buttonEls}
      </ButtonGroup>
    </ButtonToolbar>
  );
};

TableActionColumns.propTypes = {
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  onDelete: PropTypes.func,
  buttons: PropTypes.arrayOf(PropTypes.element),
  children: PropTypes.node,
  editPermission: PropTypes.number,
  viewPermission: PropTypes.number,
  deletePermission: PropTypes.node,
};

export default TableActionColumns;
