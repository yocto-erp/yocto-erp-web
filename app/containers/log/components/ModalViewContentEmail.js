import React from "react";
import PropTypes from "prop-types";
import { Form, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import RawHTML from "../../../components/RawHtml";
import ModalOKButton from "../../../components/button/ModalOKButton";

const ModalViewContentEmail = ({ isOpen, closeHandle, content }) => (
  <Modal isOpen={isOpen}>
    <Form noValidate formNoValidate>
      <ModalHeader toggle={() => closeHandle(false)}>
        Content Send Mail
      </ModalHeader>
      <ModalBody>
        <RawHTML html={content} />
      </ModalBody>
      <ModalFooter>
        <ModalOKButton type="button" onClick={() => closeHandle(false)}>
          Close
        </ModalOKButton>
      </ModalFooter>
    </Form>
  </Modal>
);

ModalViewContentEmail.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandle: PropTypes.func.isRequired,
  content: PropTypes.string,
};

export default ModalViewContentEmail;
