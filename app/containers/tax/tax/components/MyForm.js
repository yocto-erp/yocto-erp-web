import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Form, FormGroup, Label } from "reactstrap";
import { toast } from "react-toastify";
import { Controller } from "react-hook-form";
import { useHookCRUDForm } from "../../../../libs/hooks/useHookCRUDForm";
import Widget from "../../../../components/Widget/Widget";
import SubmitButton from "../../../../components/button/SubmitButton";
import BackButton from "../../../../components/button/BackButton";
import { ERROR } from "../../../../components/Form/messages";
import FormHookErrorMessage from "../../../../components/Form/FormHookErrorMessage";
import taxApi from "../../../../libs/apis/tax/tax.api";
import { TAX_TYPE, TAX_TYPE_LIST } from "../constants";
import FormGroupInput from "../../../../components/Form/FormGroupInput";
import InputNumber from "../../../../components/Form/InputNumber";
import FormError from "../../../../components/Form/FormError";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(ERROR.required),
  shortName: Yup.string()
    .max(20)
    .required(),
  type: Yup.string().required(),
  amount: Yup.number()
    .typeError("This field is required.")
    .moreThan(0, "Quantity must larger than 0")
    .required("This field is required."),
});

const { create, update, read } = taxApi;

function MyForm({ id }) {
  const {
    register,
    submit,
    errors,
    control,
    state: { isLoading, errors: serverErrors },
    formState: { isDirty, isValid },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update Tax ${resp.name} success`
          : `Create Tax ${resp.name} success`,
      );
    },
    validationSchema,
    initForm: {
      name: "",
      type: TAX_TYPE.PERCENT,
      amount: "",
    },
    id,
  });

  return (
    <Widget>
      <Form onSubmit={submit} noValidate formNoValidate>
        <FormError errors={serverErrors} />
        <FormGroupInput
          label="Tax Name"
          isRequired
          name="name"
          type="text"
          error={errors.name}
          register={register}
        />
        <FormGroupInput
          label="Short Name"
          isRequired
          name="shortName"
          type="text"
          error={errors.shortName}
          register={register}
        />
        <FormGroupInput
          label="Tax Type"
          isRequired
          name="type"
          type="select"
          error={errors.type}
          register={register}
        >
          <option value="">Select Tax Type</option>
          {TAX_TYPE_LIST.map(t => (
            <option key={`taxType${t.id}`} value={t.id}>
              {t.name}
            </option>
          ))}
        </FormGroupInput>
        <FormGroup>
          <Label for="name" className="mr-sm-2">
            Amount
          </Label>
          <Controller
            control={control}
            defaultValue=""
            invalid={!!errors.amount}
            name="amount"
            render={({ onChange, value, onBlur, ...props }) => (
              <InputNumber
                {...props}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Amount"
              />
            )}
          />
          <FormHookErrorMessage error={errors.amount} />
        </FormGroup>
        <FormGroupInput
          label="Remark"
          name="remark"
          type="textarea"
          register={register}
          placeholder="Remark"
        />
        <BackButton className="mr-2" />
        <SubmitButton disabled={!isValid || !isDirty} isLoading={isLoading} />
      </Form>
    </Widget>
  );
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyForm.defaultProps = {};

export default MyForm;
