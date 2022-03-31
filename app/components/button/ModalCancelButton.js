import React from "react";
import { Button } from "reactstrap";

const ModalCancelButton = props => (
  <Button {...props}>
    {/* eslint-disable-next-line react/prop-types */}
    {props.children ? props.children : "Cancel"}
  </Button>
);

ModalCancelButton.propTypes = {};

export default ModalCancelButton;
