import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const ModalOKButton = ({ isLoading, children, ...props }) => {
  let els = 'Loading';
  if (!isLoading) {
    if (children) {
      els = children;
    } else {
      els = 'Submit';
    }
  }
  return (
    <Button color="info" disabled={isLoading} {...props}>
      {els}
    </Button>
  );
};

ModalOKButton.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.any,
};

export default ModalOKButton;
