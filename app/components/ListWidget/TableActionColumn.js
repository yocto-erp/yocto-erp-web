import React from 'react';
import PropTypes from 'prop-types';
import { isArray, isFunction } from 'lodash';
import { Button, ButtonGroup, ButtonToolbar } from 'reactstrap';

const TableActionColumns = ({
  onEdit,
  onView,
  onDelete,
  buttons = [],
  children,
}) => {
  const buttonEls = [];
  if (isArray(buttons)) {
    buttons.forEach(t => buttonEls.push(t));
  }
  if (isFunction(onView)) {
    buttonEls.push(
      <Button key="view" onClick={onView} color="info">
        <i className="fi flaticon-view" />
      </Button>,
    );
  }
  if (isFunction(onEdit)) {
    buttonEls.push(
      <Button key="edit" onClick={onEdit} color="warning">
        <i className="fi flaticon-edit" />
      </Button>,
    );
  }
  if (isFunction(onDelete)) {
    buttonEls.push(
      <Button key="delete" onClick={onDelete} color="danger">
        <i className="fi flaticon-trash" />
      </Button>,
    );
  }

  return (
    <ButtonToolbar className="">
      {children}
      <ButtonGroup size="sm">{buttonEls}</ButtonGroup>
    </ButtonToolbar>
  );
};

TableActionColumns.propTypes = {
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  onDelete: PropTypes.func,
  buttons: PropTypes.arrayOf(PropTypes.element),
  children: PropTypes.node,
};

export default TableActionColumns;
