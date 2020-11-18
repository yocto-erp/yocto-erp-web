import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { Form } from 'reactstrap';
import SubmitButton from '../../../components/button/SubmitButton';
import useMyForm from '../../../libs/hooks/useMyForm';
import FormGroup from '../../../components/Form/FormGroup';
import FormError from '../../../components/Form/FormError';
import surveyApi from '../../../libs/apis/survey.api';
import VerifyCodeForm from './VerifyCodeForm';

const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('This field is required.'),
});

const EmailValidationForm = ({ surveyId = 0 }) => {
  const clientId = useMemo(() => uuidv4(), []);

  const {
    register,
    errors,
    getValues,
    onSubmit,
    formState: { isDirty, isValid },
    state: { isLoading, errors: serverErrors, resp },
  } = useMyForm({
    validationSchema: emailValidationSchema,
    api: formData => surveyApi.sendCode(surveyId, clientId, formData.email),
  });

  const onVerify = useCallback(
    code => {
      const { email } = getValues();
      return surveyApi.verify(surveyId, clientId, email, code);
    },
    [getValues, surveyId, clientId],
  );

  const onResend = useCallback(() => {
    const { email } = getValues();
    return surveyApi.sendCode(surveyId, clientId, email);
  }, [getValues, surveyId, clientId]);

  const form = React.useMemo(
    () => (
      <Form onSubmit={onSubmit} noValidate formNoValidate>
        {serverErrors && serverErrors.length ? (
          <FormError errors={serverErrors} />
        ) : null}
        <FormGroup
          name="email"
          type="email"
          error={errors.email}
          register={register}
          placeholder="Input your email"
          label=""
          iconRight={<i className="fa fa-envelope" />}
        />
        <SubmitButton isLoading={isLoading} color="primary" />
      </Form>
    ),
    [errors, isLoading, onSubmit, register, isValid, isDirty],
  );
  return !resp ? (
    form
  ) : (
    <VerifyCodeForm onResend={onResend} onVerify={onVerify} />
  );
};

EmailValidationForm.propTypes = {
  surveyId: PropTypes.number.isRequired,
};

export default EmailValidationForm;
