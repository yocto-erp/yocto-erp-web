import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import { ButtonTypes } from "./constants";

const SendMailButton = props => (
  <Button {...props} color={props.color ? props.color : "success"}>
    <i className="fa fa-send" />
    {/* eslint-disable-next-line react/prop-types */}
    <span className="ml-2 d-sm-none d-md-inline-block">
      {props.children ? props.children : "Send Mail"}
    </span>
  </Button>
);

SendMailButton.propsType = ButtonTypes;

SendMailButton.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node,
};

export default SendMailButton;
