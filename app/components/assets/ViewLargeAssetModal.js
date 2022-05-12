import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { imageUrl } from "../../libs/apis/image.api";
import ModalOKButton from "../button/ModalOKButton";

const ViewLargeAssetModal = ({ file, onClose }) => (
  <Modal
    scrollable
    size="xl"
    isOpen={file != null}
    fade={false}
    className="primary"
  >
    <ModalHeader toggle={() => onClose(null)}>{file?.name}</ModalHeader>
    <ModalBody className="text-center">
      <figure className="figure">
        {file != null ? (
          <img
            src={imageUrl(file?.fileId)}
            className="figure-img img-fluid rounded"
            alt=""
          />
        ) : (
          ""
        )}
        <figcaption className="figure-caption">{file?.name}</figcaption>
      </figure>
    </ModalBody>
    <ModalFooter>
      <ModalOKButton type="button" onClick={() => onClose(null)}>
        Close
      </ModalOKButton>
    </ModalFooter>
  </Modal>
);

ViewLargeAssetModal.propTypes = {
  file: PropTypes.object,
  onClose: PropTypes.func,
};

export default ViewLargeAssetModal;
