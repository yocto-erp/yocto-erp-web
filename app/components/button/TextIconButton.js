import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const TextIconButton = ({
  isLoading,
  children,
  disabled,
  type = 'button',
  color = 'info',
  icon,
  ...props
}) => {
  const isDisabled = isLoading || disabled;
  return (
    <Button color={color} disabled={isDisabled} type={type} {...props}>
      {isLoading ? <i className="fa fa-spinner fa-spin fa-fw" /> : icon}&nbsp;
      {children}
    </Button>
  );
};

TextIconButton.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.node,
};

export default TextIconButton;
