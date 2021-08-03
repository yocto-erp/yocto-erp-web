import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import FormGroupInput from '../../../components/Form/FormGroupInput';
import SubmitButton from '../../../components/button/SubmitButton';
import { getClientId } from '../../../libs/utils/storage';
import { SURVEY_ROOT_PATH } from '../constants';
import useSyncForm from '../../../libs/hooks/useSyncForm';
import messages, { verifyCodeFormMessages } from '../messages';

const schema = Yup.object().shape({
  code: Yup.string().required('This field is required.'),
});

const VerifyCodeForm = ({ surveyId, target, intl }) => {
  const history = useHistory();
  const clientId = getClientId();
  const {
    register,
    errors,
    onSubmit,
    formState: { isDirty, isValid },
  } = useSyncForm({
    validationSchema: schema,
    api: formData =>
      new Promise(resolve => {
        const base64String = btoa(
          `${surveyId}|${clientId}|${target}|${formData.code}`,
        );
        resolve(history.push(`${SURVEY_ROOT_PATH}/${base64String}`));
      }),
  });

  return (
    <>
      <div className="alert alert-success" role="alert">
        <p className="mb-0">
          <FormattedMessage {...verifyCodeFormMessages.sentMessage} />
        </p>
      </div>
      <Form onSubmit={onSubmit} noValidate formNoValidate>
        <FormGroupInput
          name="code"
          type="text"
          error={errors.code}
          register={register}
          placeholder={intl.formatMessage(verifyCodeFormMessages.code)}
          iconLeft={<i className="fa fa-code" />}
        />
        <SubmitButton disabled={!isDirty || !isValid} color="primary">
          <FormattedMessage {...messages.submit} />
        </SubmitButton>
      </Form>
    </>
  );
};

VerifyCodeForm.propTypes = {
  surveyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  target: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(VerifyCodeForm);
