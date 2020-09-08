import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const SubmitButton = ({ isLoading, children, disabled, ...props }) => {
  const isDisabled = isLoading || disabled;
  return (
    <Button color="info" disabled={isDisabled} {...props}>
      {isLoading ? <i className="fa fa-spinner fa-spin fa-fw" /> : ''}&nbsp;
      {children || 'Submit'}
    </Button>
  );
};
SubmitButton.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.any,
  disabled: PropTypes.bool,
};

export default SubmitButton;
