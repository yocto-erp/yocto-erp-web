import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Widget from '../../../components/Widget/Widget';
import useMyForm from '../../../libs/hooks/useMyForm';
import FormError from '../../../components/Form/FormError';
import { ERROR } from '../../../components/Form/messages';
import FormErrorMessage from '../../../components/Form/FormHookErrorMessage';
import SubmitButton from '../../../components/button/SubmitButton';
import emailConfigurationApi from '../../../libs/apis/configuration/email.api';

const EmailTestForm = ({ configuration }) => {
  const validationSchema = yup.object().shape({
    from: yup
      .string()
      .email()
      .required(ERROR.required),
    to: yup
      .string()
      .email()
      .required(ERROR.required),
  });
  const {
    register,
    errors,
    onSubmit,
    formState: { isValid, isDirty },
    state: { isLoading, errors: serverErrors, resp: submitResp },
  } = useMyForm({
    api: async data => emailConfigurationApi.test(configuration, data),
    validationSchema,
  });

  useEffect(() => {
    if (submitResp) {
      toast.success(`Send Email success: ${JSON.stringify(submitResp)}`);
    }
  }, [submitResp]);

  return (
    <Widget title="Send Test Email">
      {serverErrors && serverErrors.length ? (
        <FormError errors={serverErrors} />
      ) : (
        ''
      )}
      <Form onSubmit={onSubmit} noValidate formNoValidate>
        <FormGroup>
          <Label className="">From</Label>
          <Input
            invalid={!!errors.from}
            type="email"
            name="from"
            id="from"
            placeholder="From Email Address"
            innerRef={register}
          />
          <FormErrorMessage error={errors.from} />
        </FormGroup>
        <FormGroup>
          <Label className="">To</Label>
          <Input
            invalid={!!errors.to}
            type="email"
            name="to"
            id="to"
            placeholder="To Email Address"
            innerRef={register}
          />
          <FormErrorMessage error={errors.to} />
        </FormGroup>
        <SubmitButton
          color="primary"
          outline
          isLoading={isLoading}
          type="submit"
          disabled={!isDirty || !isValid || !configuration}
        >
          Send
        </SubmitButton>
      </Form>
    </Widget>
  );
};

EmailTestForm.propTypes = {
  configuration: PropTypes.object,
};

export default EmailTestForm;
