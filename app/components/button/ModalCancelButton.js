import React from "react";
import { Button } from "reactstrap";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { commonMessage } from "../../containers/messages";

const ModalCancelButton = props => (
  <Button {...props}>
    {props.children || <FormattedMessage {...commonMessage.btnClose} />}
  </Button>
);

ModalCancelButton.propTypes = {
  children: PropTypes.node,
};

export default ModalCancelButton;
