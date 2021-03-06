import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const SearchButton = ({
  isLoading,
  children,
  color = 'info',
  className,
  outline = true,
  ...props
}) => {
  let els = 'Loading';
  if (!isLoading) {
    if (children) {
      els = children;
    } else {
      els = 'Search';
    }
  }
  return (
    <Button
      color={color}
      className={className}
      outline={outline}
      disabled={isLoading}
      {...props}
    >
      <i className="fi flaticon-search mr-2" />
      {els}
    </Button>
  );
};

SearchButton.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.any,
  color: PropTypes.string,
  className: PropTypes.string,
  outline: PropTypes.bool,
};

export default SearchButton;
