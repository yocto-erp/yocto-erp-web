import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { toast } from "react-toastify";
import FormError from "../../../components/Form/FormError";
import ModalCancelButton from "../../../components/button/ModalCancelButton";
import { API_STATE, useApi } from "../../../libs/hooks/useApi";
import ModalOKButton from "../../../components/button/ModalOKButton";
import userApi from "../../../libs/apis/user.api";

const ResendInviteModal = ({ user, onClose }) => {
  const { state, exec } = useApi(userApi.resendInvite);

  useEffect(() => {
    if (state.status === API_STATE.SUCCESS) {
      toast.success(`Gởi lại lời mời thành công đến email ${user?.email}`);
      onClose(true);
    }
  }, [state]);

  return (
    <Modal isOpen={user !== null} className="info">
      <ModalHeader toggle={() => onClose(false)}>Gởi lại lời mời</ModalHeader>
      <ModalBody>
        <p>
          Gởi lại lời mời đến email <strong>{user?.email}</strong> ?
        </p>
        <FormError errors={state.errors} />
      </ModalBody>
      <ModalFooter>
        <ModalCancelButton onClick={() => onClose(false)} />
        <ModalOKButton type="button" onClick={() => exec(user?.id)} />
      </ModalFooter>
    </Modal>
  );
};

ResendInviteModal.propTypes = {
  user: PropTypes.object,
  onClose: PropTypes.func,
};

export default ResendInviteModal;
