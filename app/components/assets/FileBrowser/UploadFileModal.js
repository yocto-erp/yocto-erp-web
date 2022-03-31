import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { FilePond, FileStatus, registerPlugin } from "react-filepond";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import ModalCancelButton from "../../button/ModalCancelButton";
import SubmitButton from "../../button/SubmitButton";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { ASSET_API_ENDPOINT_URL } from "../../../libs/apis/image.api";
import { get, STORAGE } from "../../../libs/utils/storage";

registerPlugin(FilePondPluginImageResize, FilePondPluginImagePreview);

const UploadFileModal = ({ isOpen, closeHandle, parentId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pondFl = useRef(null);

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={() => closeHandle(false)}>Upload Files</ModalHeader>
      <ModalBody>
        <FilePond
          ref={pondFl}
          instantUpload={false}
          allowMultiple
          allowProcess={false}
          allowRevert={false}
          maxFiles={10}
          onerror={(error, file, status) => {
            console.log(error, file, status);
          }}
          onprocessfiles={(error, file) => {
            console.log("onprocessfile", file);
            if (error) {
              toast.error(file.body);
            }
            setIsLoading(false);
          }}
          name="files"
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          server={{
            url: "",
            process: {
              url: `${ASSET_API_ENDPOINT_URL}/upload`,
              headers: {
                Authorization: `Bearer ${encodeURIComponent(get(STORAGE.JWT))}`,
              },
              timeout: 7000,
              onload: null,
              onerror: null,
              ondata: formData => {
                formData.append("parentId", parentId);
                return formData;
              },
            },
          }}
        />
      </ModalBody>
      <ModalFooter>
        <ModalCancelButton onClick={() => closeHandle(false)}>
          Close
        </ModalCancelButton>
        <SubmitButton
          type="submit"
          onClick={() => {
            console.log("submit");
            console.log(pondFl.current);
            console.log(pondFl.current.getFiles().map(t => t.status));
            const totalFileNotYetProcess = pondFl.current
              .getFiles()
              .filter(t => t.status !== FileStatus.PROCESSING_COMPLETE).length;
            if (totalFileNotYetProcess > 0) {
              pondFl.current.processFiles();
              setIsLoading(true);
            }
          }}
          isLoading={isLoading}
        >
          Upload
        </SubmitButton>
      </ModalFooter>
    </Modal>
  );
};

UploadFileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandle: PropTypes.func.isRequired,
  parentId: PropTypes.any,
};

export default UploadFileModal;
