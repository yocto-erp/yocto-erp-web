import React from "react";
import PropTypes from "prop-types";
import { Form, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { yupResolver } from "@hookform/resolvers";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import FormRow from "../../Form/FormRow";
import ModalCancelButton from "../../button/ModalCancelButton";
import SubmitButton from "../../button/SubmitButton";
import companyApi from "../../../libs/apis/company.api";
import { useAsync } from "../../../libs/hooks/useAsync";
import messages from "./messages";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("This field is required."),
});

const TITLE_COL = 4;
const INPUT_COL = 8;

const CompanyModalForm = ({ isOpen, closeHandle }) => {
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

  const [isLoading, exec] = useAsync({ asyncApi: companyApi.create });
  const onSubmit = handleSubmit(val => {
    exec(val).then(result => {
      toast.success(`Create Company ${result.name} success !`);
      closeHandle(result);
    });
  });
  return (
    <Modal isOpen={isOpen}>
      <Form noValidate formNoValidate>
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
          <SubmitButton
            disabled={!isValid || !isDirty}
            type="button"
            isLoading={isLoading}
            onClick={onSubmit}
          />
        </ModalFooter>
      </Form>
    </Modal>
  );
};

CompanyModalForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandle: PropTypes.func.isRequired,
};

export default CompanyModalForm;
