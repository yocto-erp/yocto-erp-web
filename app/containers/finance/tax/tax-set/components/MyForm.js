import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Form, FormGroup, Label } from "reactstrap";
import { toast } from "react-toastify";
import { Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useHookCRUDForm } from "../../../../../libs/hooks/useHookCRUDForm";
import Widget from "../../../../../components/Widget/Widget";
import SubmitButton from "../../../../../components/button/SubmitButton";
import BackButton from "../../../../../components/button/BackButton";
import { ERROR } from "../../../../../components/Form/messages";
import taxSetApi from "../../../../../libs/apis/tax/tax-set.api";
import FormGroupInput from "../../../../../components/Form/FormGroupInput";
import FormError from "../../../../../components/Form/FormError";
import messages from "../messages";
import TaxSelect from "../../tax/components/TaxSelect";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(ERROR.required),
  taxes: Yup.array(),
});

const { create, update, read } = taxSetApi;

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
          ? `Update Tax Set ${resp.name} success`
          : `Create Tax Set ${resp.name} success`,
      );
    },
    validationSchema,
    initForm: {
      name: "",
    },
    id,
  });

  return (
    <Widget>
      <Form onSubmit={submit} noValidate formNoValidate>
        <FormError errors={serverErrors} />
        <FormGroupInput
          label={<FormattedMessage {...messages.name} />}
          isRequired
          name="name"
          type="text"
          placeholder="name"
          error={errors.name}
          register={register}
        />
        <FormGroup>
          <Label for="taxes" className="required">
            List of Tax
          </Label>
          <Controller
            defaultValue={null}
            name="taxes"
            control={control}
            id="taxes"
            render={({ onChange, value }, { invalid }) => (
              <TaxSelect
                name="taxes"
                placeholder="Select Taxes"
                onChange={onChange}
                value={value}
                invalid={invalid}
              />
            )}
          />
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
