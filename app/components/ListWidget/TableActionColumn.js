import React from 'react';
import PropTypes from 'prop-types';
import { isFunction, isArray } from 'lodash';
import { Button, ButtonGroup, ButtonToolbar } from 'reactstrap';

const TableActionColumns = ({ onEdit, onView, onDelete, buttons = [] }) => {
  const buttonEls = [];
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
  if (isArray(buttons)) {
    buttonEls.forEach(t => buttons.push(t));
  }
  return (
    <ButtonToolbar className="">
      <ButtonGroup size="sm">{buttonEls}</ButtonGroup>
    </ButtonToolbar>
  );
};

TableActionColumns.propTypes = {
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  onDelete: PropTypes.func,
  buttons: PropTypes.arrayOf(PropTypes.element),
};

export default TableActionColumns;
