import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const SubmitButton = ({
  isLoading,
  children,
  disabled,
  type = 'submit',
  color = 'info',
  ...props
}) => {
  const isDisabled = isLoading || disabled;
  return (
    <Button color={color} disabled={isDisabled} type={type} {...props}>
      {isLoading ? <i className="fa fa-spinner fa-spin fa-fw" /> : ''}&nbsp;
      {children || 'Submit'}
    </Button>
  );
};
SubmitButton.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  color: PropTypes.string,
};

export default SubmitButton;
