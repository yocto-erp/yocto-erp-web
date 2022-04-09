import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { yupResolver } from "@hookform/resolvers";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { API_STATE, useApi } from "../../../../libs/hooks/useApi";
import posApi from "../../../../libs/apis/pos.api";
import ModalCancelButton from "../../../../components/button/ModalCancelButton";
import SubmitButton from "../../../../components/button/SubmitButton";
import UserSelect from "../../../user/components/UserSelect";
import { useListActionContext } from "../../../../components/ListWidget/constants";

const validationSchema = Yup.object().shape({
  users: Yup.array().required("This field is required."),
});

const POSAssignUserModal = ({ pos, closeHandle }) => {
  const {
    control,
    handleSubmit,
    errors,
    reset,
    formState: { isValid, isDirty },
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: { users: null },
  });

  const { refresh } = useListActionContext();
  const { state, exec } = useApi(posApi.getUsers);
  const { state: assignState, exec: assignUserExec } = useApi(
    posApi.assignUsers,
  );

  const onSubmit = handleSubmit(val => {
    assignUserExec(pos?.id, val);
  });

  useEffect(() => {
    if (pos) {
      exec(pos.id);
    }
  }, [pos]);

  useEffect(() => {
    console.log(state);
    if (state.status === API_STATE.SUCCESS) {
      reset({ users: state.resp });
    }
  }, [state]);

  useEffect(() => {
    if (assignState.status === API_STATE.SUCCESS) {
      toast.success(`Assign users success !`);
      refresh();
      closeHandle();
    } else if (assignState.status === API_STATE.FAIL) {
      toast.error(assignState.errors.map(t => t.message || t.code).join("\n"));
    }
  }, [assignState]);

  return (
    <Modal isOpen={pos != null}>
      <Form noValidate formNoValidate>
        <ModalHeader toggle={() => closeHandle(false)}>
          Assign User to POS ({pos?.name})
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="users" className="required">
              Users
            </Label>
            <Controller
              invalid={!!errors.users}
              defaultValue={null}
              name="users"
              control={control}
              id="users"
              render={({ onChange, value }, { invalid }) => (
                <UserSelect
                  placeholder="Select Users"
                  onChange={onChange}
                  value={value}
                  invalid={invalid}
                />
              )}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <ModalCancelButton onClick={() => closeHandle(false)} />
          <SubmitButton
            disabled={!isValid || !isDirty}
            type="button"
            isLoading={assignState.status === API_STATE.LOADING}
            onClick={onSubmit}
          />
        </ModalFooter>
      </Form>
    </Modal>
  );
};

POSAssignUserModal.propTypes = {
  pos: PropTypes.object.isRequired,
  closeHandle: PropTypes.func.isRequired,
};

export default POSAssignUserModal;
