import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import isFunction from "lodash/isFunction";
import ModalCancelButton from "../button/ModalCancelButton";

const AlertModal = ({
  message,
  title,
  onClose,
  isOpen = false,
  type = "success",
}) => (
  <Modal className={type} isOpen={isOpen} fade={false}>
    <ModalHeader toggle={() => onClose(false)}>{title || "Confirmation ?"}</ModalHeader>
    <ModalBody>{isFunction(message) ? message() : message}</ModalBody>
    <ModalFooter>
      <ModalCancelButton onClick={() => onClose(false)} />
      {/* <ModalOKButton color={type} onClick={() => onClose(true)}> */}
      {/*   <i className="fa fa-check fa-fw mr-2" /> Confirm */}
      {/* </ModalOKButton> */}
    </ModalFooter>
  </Modal>
);

AlertModal.propTypes = {
  message: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  title: PropTypes.node,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  type: PropTypes.oneOf(["warning", "danger", "success"]),
};

export default AlertModal;
