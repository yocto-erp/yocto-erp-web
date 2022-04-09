import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import isFunction from "lodash/isFunction";
import ModalOKButton from "../button/ModalOKButton";
import ModalCancelButton from "../button/ModalCancelButton";

const ConfirmModal = ({ message, title, onClose, isOpen = false }) => (
  <Modal className="warning" isOpen={isOpen} fade={false}>
    <ModalHeader toggle={() => onClose(false)}>
      {title || "Confirmation ?"}
    </ModalHeader>
    <ModalBody>{isFunction(message) ? message() : message}</ModalBody>
    <ModalFooter>
      <ModalCancelButton onClick={() => onClose(false)} />
      <ModalOKButton color="warning" onClick={() => onClose(true)}>
        <i className="fa fa-check fa-fw mr-2" /> Confirm
      </ModalOKButton>
    </ModalFooter>
  </Modal>
);

ConfirmModal.propTypes = {
  message: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  title: PropTypes.node,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ConfirmModal;
