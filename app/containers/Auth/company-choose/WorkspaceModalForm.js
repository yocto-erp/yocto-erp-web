import React from "react";
import PropTypes from "prop-types";
import { Form, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { yupResolver } from "@hookform/resolvers";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import { useAsync } from "../../../libs/hooks/useAsync";
import messages from "./messages";
import { workspaceApi } from "../../../libs/apis/workspace.api";
import FormRow from "../../../components/Form/FormRow";
import ModalCancelButton from "../../../components/button/ModalCancelButton";
import SubmitButton from "../../../components/button/SubmitButton";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("This field is required."),
});

const TITLE_COL = 4;
const INPUT_COL = 8;

const WorkspaceModalForm = ({ isOpen, closeHandle }) => {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isValid, isDirty },
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: { name: "", gsm: "", address: "", remark: "" },
  });

  const [isLoading, exec] = useAsync({ asyncApi: workspaceApi.create });
  const onSubmit = handleSubmit(val => {
    exec(val).then(result => {
      toast.success(`Create Company ${result.name} success !`);
      closeHandle(result);
    });
  });
  return (
    <Modal isOpen={isOpen} className="info">
      <Form noValidate formNoValidate onSubmit={onSubmit}>
        <ModalHeader toggle={() => closeHandle(false)}>
          <FormattedMessage {...messages.modalTitle} />
        </ModalHeader>
        <ModalBody>
          <FormattedMessage {...messages.formName}>
            {msg => (
              <FormRow
                labelCol={TITLE_COL}
                valueCol={INPUT_COL}
                label={msg}
                isRequired
                name="name"
                type="text"
                error={errors.name}
                register={register}
                placeholder={msg}
              />
            )}
          </FormattedMessage>
          <FormattedMessage {...messages.formGSM}>
            {msg => (
              <FormRow
                labelCol={TITLE_COL}
                valueCol={INPUT_COL}
                label={msg}
                name="gsm"
                type="tel"
                register={register}
                placeholder={msg}
              />
            )}
          </FormattedMessage>
          <FormattedMessage {...messages.formEmail}>
            {msg => (
              <FormRow
                labelCol={TITLE_COL}
                valueCol={INPUT_COL}
                label={msg}
                name="email"
                type="email"
                register={register}
                placeholder={msg}
              />
            )}
          </FormattedMessage>
          <FormattedMessage {...messages.formAddress}>
            {msg => (
              <FormRow
                labelCol={TITLE_COL}
                valueCol={INPUT_COL}
                label={msg}
                name="address"
                type="text"
                register={register}
                placeholder={msg}
              />
            )}
          </FormattedMessage>
          <FormattedMessage {...messages.formRemark}>
            {msg => (
              <FormRow
                labelCol={TITLE_COL}
                valueCol={INPUT_COL}
                label={msg}
                name="remark"
                rows={4}
                type="textarea"
                register={register}
                placeholder={msg}
              />
            )}
          </FormattedMessage>
        </ModalBody>
        <ModalFooter>
          <ModalCancelButton onClick={() => closeHandle(false)} />
          <SubmitButton disabled={!isValid || !isDirty} isLoading={isLoading} />
        </ModalFooter>
      </Form>
    </Modal>
  );
};

WorkspaceModalForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandle: PropTypes.func.isRequired,
};

export default WorkspaceModalForm;
