import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import FormRow from "../../Form/FormRow";
import ModalCancelButton from "../../button/ModalCancelButton";
import SubmitButton from "../../button/SubmitButton";
import { ERROR } from "../../Form/messages";
import { API_STATE, useApi } from "../../../libs/hooks/useApi";
import FormError from "../../Form/FormError";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(ERROR.required),
});

const NewFolderModal = ({ isOpen, closeHandle, parentId, newFolderApi }) => {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isValid, isDirty },
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
    },
  });

  const { exec, state, reset } = useApi(newFolderApi);
  const onSubmit = handleSubmit(val => {
    exec({ parentId, ...val });
  });

  useEffect(() => {
    if (state.status === API_STATE.SUCCESS) {
      toast.success(`Create Folder success !`);
      closeHandle(state.resp);
      reset();
    }
  }, [closeHandle, state]);

  return (
    <Modal isOpen={isOpen}>
      <Form noValidate formNoValidate>
        <ModalHeader toggle={() => closeHandle(false)}>
          Create new folder
        </ModalHeader>
        <ModalBody>
          <FormError errors={state.errors} />
          <FormRow
            label={
              <span className="text-nowrap">
                Name <span className="text-danger">*</span>
              </span>
            }
            labelCol={3}
            valueCol={9}
            name="name"
            type="text"
            error={errors.name}
            register={register}
            placeholder="Folder Name"
          />
        </ModalBody>
        <ModalFooter>
          <ModalCancelButton onClick={() => closeHandle(false)} />
          <SubmitButton
            disabled={!isValid || !isDirty}
            type="button"
            isLoading={state.status === API_STATE.LOADING}
            onClick={onSubmit}
          />
        </ModalFooter>
      </Form>
    </Modal>
  );
};

NewFolderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandle: PropTypes.func.isRequired,
  parentId: PropTypes.any,
  newFolderApi: PropTypes.func.isRequired,
};

export default NewFolderModal;
