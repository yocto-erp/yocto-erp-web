import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ModalCancelButton from "../../button/ModalCancelButton";
import SubmitButton from "../../button/SubmitButton";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "./UploadFileModal.scss";
import { API_STATE, useApi } from "../../../libs/hooks/useApi";

const DeleteFileModal = ({ closeHandle, assets = [], deleteApi }) => {
  const { state, exec, reset } = useApi(deleteApi);

  useEffect(() => {
    if (state.status === API_STATE.SUCCESS) {
      toast.success(`Delete success total ${state.resp.total} assets`);
      closeHandle(true);
      reset();
    } else if (state.status === API_STATE.FAIL) {
      toast.error(state.errors.map(t => (t.message || t.code).join("\n")));
    }
  }, [state]);
  if (!assets || !assets.length) {
    return null;
  }
  return (
    <Modal isOpen className="danger">
      <ModalHeader toggle={() => closeHandle(false)}>
        <>Delete {assets.length} assets ?</>
      </ModalHeader>
      <ModalBody>
        DELETE ? You will not able to recover these assets !
      </ModalBody>
      <ModalFooter>
        <ModalCancelButton onClick={() => closeHandle(false)}>
          Close
        </ModalCancelButton>
        <SubmitButton
          color="danger"
          type="submit"
          onClick={() => {
            exec(assets);
          }}
          isLoading={state.status === API_STATE.LOADING}
        >
          DELETE
        </SubmitButton>
      </ModalFooter>
    </Modal>
  );
};

DeleteFileModal.propTypes = {
  closeHandle: PropTypes.func.isRequired,
  assets: PropTypes.array,
  deleteApi: PropTypes.func,
};

export default DeleteFileModal;
