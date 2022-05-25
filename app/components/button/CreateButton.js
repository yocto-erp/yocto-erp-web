import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classnames from "classnames";
import { ButtonTypes } from "./constants";
import { commonMessage } from "../../containers/messages";
import { IconPlus } from "../../containers/Icon/constants";

const CreateButton = ({ color, className, ...props }) => (
  <Button
    {...props}
    color={color || "primary"}
    className={classnames(className, "btn-icon")}
  >
    {props.icon || <IconPlus className="mr-1" />}
    {props.children ? (
      props.children
    ) : (
      <FormattedMessage {...commonMessage.btnCreate} />
    )}
  </Button>
);

CreateButton.propsType = ButtonTypes;

CreateButton.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default CreateButton;
