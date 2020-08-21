import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const SubmitButton = ({ isLoading, children, ...props }) => (
  <Button variant="primary" disabled={isLoading} {...props}>
    {isLoading ? 'Loading' : children}
  </Button>
);

SubmitButton.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.any,
};

export default SubmitButton;
