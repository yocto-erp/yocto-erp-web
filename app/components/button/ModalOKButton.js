import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const ModalOKButton = ({ isLoading, children, disabled, ...props }) => {
  let els = 'Processing...';
  if (!isLoading) {
    if (children) {
      els = children;
    } else {
      els = 'Submit';
    }
  }
  return (
    <Button color="info" disabled={!!disabled || isLoading} {...props}>
      {isLoading ? <i className="fa fa-spin fa-spinner mr-2" /> : null}
      {els}
    </Button>
  );
};

ModalOKButton.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.any,
  disabled: PropTypes.bool,
};

export default ModalOKButton;
