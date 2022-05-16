import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import { Controller } from "react-hook-form";
import { useHookCRUDForm } from "../../../../libs/hooks/useHookCRUDForm";
import shopApi from "../../../../libs/apis/shop.api";
import Widget from "../../../../components/Widget/Widget";
import SubmitButton from "../../../../components/button/SubmitButton";
import BackButton from "../../../../components/button/BackButton";
import { ERROR } from "../../../../components/Form/messages";
import FormHookErrorMessage from "../../../../components/Form/FormHookErrorMessage";
import messages from "../messages";
import UserSelect from "../../../user/components/UserSelect";
import FormError from "../../../../components/Form/FormError";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(ERROR.required),
});

const { create, update, read } = shopApi;

function MyForm({ id, intl }) {
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
        intl.formatMessage(messages.formSaveSuccess, { name: resp?.name }),
      );
    },
    validationSchema,
    initForm: {
      name: "",
      address: "",
    },
    id,
  });

  const form = React.useMemo(
    () => (
      <Form onSubmit={submit} noValidate formNoValidate>
        <FormError errors={serverErrors} />
        <FormattedMessage {...messages.formName}>
          {msg => (
            <FormGroup>
              <Label for="name" className="mr-sm-2">
                {msg}
              </Label>
              <Input
                invalid={!!errors.name}
                type="text"
                name="name"
                innerRef={register}
                id="name"
                placeholder={msg}
              />
              <FormHookErrorMessage error={errors.name} />
            </FormGroup>
          )}
        </FormattedMessage>
        <FormattedMessage {...messages.formAddress}>
          {msg => (
            <FormGroup>
              <Label for="address" className="required">
                {msg}
              </Label>
              <Input
                type="text"
                name="address"
                innerRef={register}
                id="address"
                placeholder={msg}
              />
            </FormGroup>
          )}
        </FormattedMessage>
        <FormattedMessage {...messages.formUser}>
          {msg => (
            <FormGroup>
              <Label for="users" className="required">
                {msg}
              </Label>
              <Controller
                invalid={!!errors.users}
                defaultValue={null}
                name="users"
                control={control}
                id="users"
                render={({ onChange, value, name }, { invalid }) => (
                  <UserSelect
                    placeholder={msg}
                    onChange={onChange}
                    value={value}
                    invalid={invalid}
                    name={name}
                  />
                )}
              />
            </FormGroup>
          )}
        </FormattedMessage>
        <BackButton className="mr-2" />
        <SubmitButton disabled={!isValid || !isDirty} isLoading={isLoading} />
      </Form>
    ),
    [errors, isLoading, submit, register],
  );
  return <Widget>{form}</Widget>;
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  intl: intlShape.isRequired,
};

MyForm.defaultProps = {};

export default injectIntl(MyForm);
