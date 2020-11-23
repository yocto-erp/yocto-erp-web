import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import SubmitButton from '../../../components/button/SubmitButton';
import useMyForm from '../../../libs/hooks/useMyForm';
import FormGroup from '../../../components/Form/FormGroup';
import FormError from '../../../components/Form/FormError';
import surveyApi from '../../../libs/apis/survey.api';
import VerifyCodeForm from './VerifyCodeForm';
import { getClientId } from '../../../libs/utils/storage';
import { SURVEY_ROOT_PATH } from '../constants';

const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('This field is required.'),
});

const EmailValidationForm = ({ surveyId = 0 }) => {
  const clientId = getClientId();
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
          iconLeft={<i className="fa fa-envelope" />}
        />
        <SubmitButton
          isLoading={isLoading}
          color="primary"
          disabled={!isDirty || !isValid}
        />
      </Form>
    ),
    [errors, isLoading, onSubmit, register, isValid, isDirty],
  );
  return !resp ? (
    form
  ) : (
    <VerifyCodeForm surveyId={surveyId} target={resp.target} />
  );
};

EmailValidationForm.propTypes = {
  surveyId: PropTypes.number.isRequired,
};

export default EmailValidationForm;
