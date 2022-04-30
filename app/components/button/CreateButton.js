import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { ButtonTypes } from "./constants";
import { commonMessage } from "../../containers/messages";

const CreateButton = props => (
  <Button {...props} color={props.color ? props.color : "primary"}>
    <i className={props.icon ? `${props.icon}` : "las la-plus"} />
    {/* eslint-disable-next-line react/prop-types */}
    <span className="d-sm-none d-md-inline-block ml-2">
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
