import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { ButtonTypes } from "./constants";
import { commonMessage } from "../../containers/messages";
import { IconPlus } from "../../containers/Icon/constants";

const CreateButton = ({ color, ...props }) => (
  <Button {...props} color={color || "primary"}>
    <span className="d-flex align-items-center justify-content-center">
      {props.icon || <IconPlus className="mr-1" />}
      {props.children ? (
        props.children
      ) : (
        <FormattedMessage {...commonMessage.btnCreate} />
      )}
    </span>
  </Button>
);

CreateButton.propsType = ButtonTypes;

CreateButton.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
};

export default CreateButton;
