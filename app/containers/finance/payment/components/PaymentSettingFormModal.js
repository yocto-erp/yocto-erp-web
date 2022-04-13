import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Form, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import SubmitButton from "../../../../components/button/SubmitButton";
import { transformUnNumberToNull } from "../../../../libs/utils/number.util";
import FormGroupInput from "../../../../components/Form/FormGroupInput";
import FormGroup from "../../../../components/Form/FormGroup";
import Editor from "../../../../components/Form/Editor";
import ModalCancelButton from "../../../../components/button/ModalCancelButton";
import FormError from "../../../../components/Form/FormError";
import { useHookCRUDForm } from "../../../../libs/hooks/useHookCRUDForm";
import { LIST_PAYMENT_METHOD, PAYMENT_METHOD } from "../constants";
import { PaymentApi } from "../../../../libs/apis/finance/payment.api";

const { create, read, update } = PaymentApi;
const PaymentSettingFormModal = ({ isOpen, onClose, id }) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    paymentTypeId: yup
      .number()
      .transform(transformUnNumberToNull)
      .nullable()
      .required(),
  });
  const {
    register,
    watch,
    control,
    state: { isLoading, errors: serverErrors },
    formState: { isValid, isDirty, errors },
    submit,
  } = useHookCRUDForm({
    id,
    create,
    read,
    update,
    validationSchema: schema,
    initForm: { paymentTypeId: "", setting: "" },
    onSuccess: resp => {
      toast.success(
        id ? `Update Payment Method success` : `Add Payment Method success`,
      );
      onClose(resp);
    },
  });

  const paymentTypeId = watch("paymentTypeId");

  return (
    <Modal isOpen={isOpen} size="lg">
      <ModalHeader>
        <span>Add Payment Method</span>
      </ModalHeader>
      <ModalBody>
        <FormError errors={serverErrors} />
        <Form noValidate formNoValidate onSubmit={submit}>
          <FormGroupInput
            label="Name"
            isRequired
            name="name"
            type="text"
            error={errors.name}
            register={register}
          />
          <FormGroupInput
            label="Payment Method"
            isRequired
            name="paymentTypeId"
            type="select"
            error={errors.paymentTypeId}
            register={register}
          >
            <option value="">Select Payment Method</option>
            {LIST_PAYMENT_METHOD.map(t => (
              <option key={`paymentMethod${t.id}`} value={t.id}>
                {t.name}
              </option>
            ))}
          </FormGroupInput>
          {Number(paymentTypeId) === PAYMENT_METHOD.BANK && (
            <FormGroup label="Transfer Information">
              <Controller
                name="setting"
                control={control}
                defaultValue=""
                render={({ onChange, onBlur, value, name }) => (
                  <Editor
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    name={name}
                    format="html"
                    height={400}
                  />
                )}
              />
            </FormGroup>
          )}
        </Form>
      </ModalBody>
      <ModalFooter>
        <ModalCancelButton onClick={() => onClose(false)} />
        <SubmitButton
          disabled={!isValid || !isDirty}
          type="button"
          isLoading={isLoading}
          onClick={submit}
        />
      </ModalFooter>
    </Modal>
  );
};

PaymentSettingFormModal.propTypes = {
  id: PropTypes.number,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default PaymentSettingFormModal;