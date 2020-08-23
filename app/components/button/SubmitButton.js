import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const SubmitButton = ({ isLoading, children, ...props }) => {
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

SubmitButton.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.any,
};

export default SubmitButton;
