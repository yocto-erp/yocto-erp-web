import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useWatch } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Form } from 'reactstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import SubmitButton from '../../../components/button/SubmitButton';
import useMyForm from '../../../libs/hooks/useMyForm';
import FormGroup from '../../../components/Form/FormGroup';
import FormError from '../../../components/Form/FormError';
import surveyApi from '../../../libs/apis/survey/survey.api';
import VerifyCodeForm from './VerifyCodeForm';
import { getClientId } from '../../../libs/utils/storage';
import { SURVEY_ROOT_PATH } from '../constants';
import messages from '../messages';

const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('This field is required.'),
});

const EmailValidationForm = ({ surveyId = 0, intl }) => {
  const clientId = getClientId();
  const history = useHistory();
  const {
    register,
    errors,
    onSubmit,
    control,
    formState: { isDirty, isValid },
    state: { isLoading, errors: serverErrors, resp },
  } = useMyForm({
    validationSchema: emailValidationSchema,
    api: formData => surveyApi.sendCode(surveyId, clientId, formData.email),
  });

  const target = useWatch({
    control,
    name: 'email',
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
          placeholder={intl.formatMessage(messages.emailFormPlaceholder)}
          label=""
          iconLeft={<i className="fa fa-envelope" />}
        />
        <SubmitButton
          isLoading={isLoading}
          color="primary"
          disabled={!isDirty || !isValid}
        >
          <FormattedMessage {...messages.submit} />
        </SubmitButton>
      </Form>
    ),
    [errors, isLoading, onSubmit, register, isValid, isDirty],
  );
  if (!resp && serverErrors && serverErrors.length) {
    history.push(`${SURVEY_ROOT_PATH}/result/${target}/${surveyId}`);
  }
  return !resp ? (
    form
  ) : (
    <VerifyCodeForm surveyId={surveyId} target={resp.target} />
  );
};

EmailValidationForm.propTypes = {
  surveyId: PropTypes.number.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(EmailValidationForm);
