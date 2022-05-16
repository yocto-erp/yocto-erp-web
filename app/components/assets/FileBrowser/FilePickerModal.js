import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ModalCancelButton from "../../button/ModalCancelButton";
import SubmitButton from "../../button/SubmitButton";
import LocalDrive from "../LocalDrive";
import { ASSET_TYPE, isValidMimeType } from "../constants";

const FilePickerModal = ({ isOpen, closeHandle, fileTypes, isMulti }) => {
  const [files, setFiles] = useState([]);

  const onFileSelect = useCallback(
    selectFiles => {
      if (selectFiles && selectFiles.length) {
        setFiles([
          ...selectFiles.filter(
            t =>
              t.type === ASSET_TYPE.FILE &&
              isValidMimeType(t.mimeType, fileTypes),
          ),
        ]);
      }
    },
    [setFiles],
  );
  return (
    <Modal
      isOpen={isOpen}
      className="primary"
      modalClassName="fullscreen"
      fade={false}
      scrollable
      toggle={() => closeHandle(false)}
    >
      <ModalHeader toggle={() => closeHandle(false)}>
        Select Files{" "}
        {files.length > 0
          ? `(${files.length} ${files.length === 1 ? "file" : "files"})`
          : ""}
      </ModalHeader>
      <ModalBody className="mt-2 p-0 ">
        <LocalDrive
          className="p-0"
          multiple={isMulti}
          onPicked={onFileSelect}
          fileTypes={fileTypes}
        />
      </ModalBody>
      <ModalFooter>
        <ModalCancelButton onClick={() => closeHandle(false)}>
          Close
        </ModalCancelButton>
        <SubmitButton
          type="submit"
          onClick={() => {
            closeHandle([...files]);
            setFiles([]);
          }}
        >
          Select
        </SubmitButton>
      </ModalFooter>
    </Modal>
  );
};

FilePickerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandle: PropTypes.func.isRequired,
  fileTypes: PropTypes.arrayOf(PropTypes.string),
  isMulti: PropTypes.bool,
};

export default FilePickerModal;
