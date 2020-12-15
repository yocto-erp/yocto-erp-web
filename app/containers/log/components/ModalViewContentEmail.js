import React from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, ModalBody, ModalHeader } from 'reactstrap';
import RawHTML from '../../../components/RawHtml';

const ModalViewContentEmail = ({ isOpen, closeHandle, content }) => (
  <Modal isOpen={isOpen}>
    <Form noValidate formNoValidate>
      <ModalHeader toggle={() => closeHandle(false)}>
        Content Send Mail
      </ModalHeader>
      <ModalBody>
        <RawHTML html={content} />
      </ModalBody>
    </Form>
  </Modal>
);

ModalViewContentEmail.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandle: PropTypes.func.isRequired,
  content: PropTypes.string,
};

export default ModalViewContentEmail;
