import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import { ButtonTypes } from "./constants";

const ConfigureButton = props => (
  <Button {...props} color={props.color ? props.color : "light"}>
    <i className="las la-cog" />
    {/* eslint-disable-next-line react/prop-types */}
    <span className="d-sm-none d-md-inline-block ml-2">
      {props.children ? props.children : "Configure"}
    </span>
  </Button>
);

ConfigureButton.propsType = ButtonTypes;

ConfigureButton.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node,
};

export default ConfigureButton;
