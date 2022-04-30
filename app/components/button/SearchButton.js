import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { commonMessage } from "../../containers/messages";

const SearchButton = ({
  isLoading,
  children,
  color = "info",
  className,
  outline = true,
  ...props
}) => {
  let els = "Loading";
  if (!isLoading) {
    if (children) {
      els = children;
    } else {
      els = <FormattedMessage {...commonMessage.btnSearch} />;
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
