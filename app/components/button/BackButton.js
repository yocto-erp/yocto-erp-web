import React from "react";
import { Button } from "reactstrap";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { commonMessage } from "../../containers/messages";

const BackButton = props => (
  <Button type="button" onClick={() => window.history.back()} {...props}>
    <i className="la la-angle-left" />
    {props.children || <FormattedMessage {...commonMessage.btnBack} />}
  </Button>
);

BackButton.propTypes = {
  children: PropTypes.node,
};

export default BackButton;
