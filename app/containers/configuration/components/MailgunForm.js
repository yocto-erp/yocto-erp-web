import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import FormErrorMessage from '../../../components/Form/FormHookErrorMessage';
import useMyForm from '../../../libs/hooks/useMyForm';
import SubmitButton from '../../../components/button/SubmitButton';
import { EMAIL_PROVIDER } from '../constants';
import { ERROR } from '../../../components/Form/messages';
import FormError from '../../../components/Form/FormError';

const MailgunForm = ({ form = {}, onUpdate, onConfigurationChange }) => {
  const validationSchema = yup.object().shape({
    key: yup.string().required(ERROR.required),
    domain: yup
      .string()
      .test('domain', 'Invalid Domain', value => {
        if (value === undefined || value.trim() === '') return true;
        return /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/.test(
          value,
        );
      })
      .required(ERROR.required),
  });
  const {
    register,
    errors,
    onSubmit,
    watch,
    formState: { isValid, isDirty },
    state: { isLoading, errors: serverErrors, resp: submitResp },
  } = useMyForm({
    form,
    api: async data => {
      const submitForm = { ...data, mailProvider: EMAIL_PROVIDER.MAILGUN };
      return onUpdate(submitForm);
    },
    validationSchema,
  });

  const watchAllFields = watch();

  useEffect(() => {
    if (isValid && watchAllFields) {
      onConfigurationChange({
        ...watchAllFields,
        mailProvider: EMAIL_PROVIDER.MAILGUN,
      });
    } else {
      onConfigurationChange(null);
    }
  }, [watchAllFields, isValid]);

  useEffect(() => {
    if (submitResp) {
      toast.success('Update Email configuration success');
    }
  }, [submitResp]);

  return (
    <Form onSubmit={onSubmit} noValidate formNoValidate>
      {serverErrors && serverErrors.length ? (
        <FormError errors={serverErrors} />
      ) : (
        ''
      )}
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label>
              Mailgun API Key <span className="text-danger">*</span>
            </Label>
            <Input
              invalid={!!errors.key}
              type="text"
              name="key"
              id="mailgunApiKey"
              placeholder="Mailgun API KEY"
              defaultValue={form.key}
              innerRef={register}
            />
            <FormErrorMessage error={errors.key} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>
              Domain <span className="text-danger">*</span>
            </Label>
            <Input
              invalid={!!errors.domain}
              type="text"
              placeholder="Domain"
              name="domain"
              id="mailgunDomain"
              defaultValue={form.domain}
              innerRef={register}
            />
            <FormErrorMessage error={errors.domain} />
          </FormGroup>
        </Col>
      </Row>
      <SubmitButton isLoading={isLoading} disabled={!isValid || !isDirty} />
    </Form>
  );
};

MailgunForm.propTypes = {
  form: PropTypes.object,
  onUpdate: PropTypes.func,
  onConfigurationChange: PropTypes.func,
};

export default MailgunForm;
