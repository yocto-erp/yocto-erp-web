import React, { useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { FilePond, FileStatus, registerPlugin } from "react-filepond";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import ModalCancelButton from "../../button/ModalCancelButton";
import SubmitButton from "../../button/SubmitButton";
import { ASSET_API_ENDPOINT_URL } from "../../../libs/apis/image.api";
import { get, STORAGE } from "../../../libs/utils/storage";
import { ROOT_FOLDER, SEARCH_FOLDER } from "../constants";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "./UploadFileModal.scss";

registerPlugin(
  FilePondPluginImageResize,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
);

const UploadFileModal = ({ isOpen, closeHandle, drivers, fileTypes = [] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pondFl = useRef(null);

  const parent = useMemo(() => {
    if (drivers && drivers.length) {
      const currentParent = drivers[drivers.length - 1];
      if (
        currentParent &&
        (currentParent.id !== ROOT_FOLDER && currentParent.id !== SEARCH_FOLDER)
      ) {
        return currentParent.id;
      }
    }
    return null;
  }, [drivers]);

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={() => closeHandle(false)}>
        <>
          Upload Files
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              {(drivers || []).map((t, i) => (
                <li
                  key={t.id}
                  data-index={i}
                  className="breadcrumb-item"
                  aria-current="page"
                >
                  {t.id !== SEARCH_FOLDER ? t.name : `Search (${t.name})`}
                </li>
              ))}
            </ol>
          </nav>
        </>
      </ModalHeader>
      <ModalBody>
        <FilePond
          acceptedFileTypes={fileTypes}
          ref={pondFl}
          instantUpload={false}
          allowMultiple
          allowProcess={false}
          allowRevert={false}
          maxFiles={10}
          onerror={(error, file, status) => {
            console.log(error, file, status);
            if (error) {
              toast.error(error.body);
            }
            setIsLoading(false);
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
                if (parent) {
                  formData.append("parentId", parent);
                }

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
              pondFl.current.processFiles().then();
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
  drivers: PropTypes.any,
  fileTypes: PropTypes.array,
};

export default UploadFileModal;
