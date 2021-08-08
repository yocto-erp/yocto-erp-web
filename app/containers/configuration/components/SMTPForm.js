import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import FormHookErrorMessage from '../../../components/Form/FormHookErrorMessage';
import useMyForm from '../../../libs/hooks/useMyForm';
import SubmitButton from '../../../components/button/SubmitButton';
import { EMAIL_PROVIDER } from '../constants';
import FormError from '../../../components/Form/FormError';

const SMTPForm = ({ form = {}, onUpdate, onConfigurationChange }) => {
  const validationSchema = yup.object().shape({
    username: yup.string().required(),
    port: yup
      .number()
      .positive()
      .integer()
      .typeError('Field Required')
      .required(),
    password: yup.string().required(),
    url: yup
      .string()
      .test('hostURL', 'Invalid IP Address or URL', value => {
        if (value === undefined || value.trim() === '') return true;
        return (
          /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(
            value,
          ) ||
          /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/.test(
            value,
          )
        );
      })
      .required(),
    encryption: yup.string().required(),
  });
  const {
    register,
    errors,
    watch,
    onSubmit,
    setValue,
    reset,
    formState: { isValid, isDirty },
    state: { isLoading, errors: serverErrors, resp: submitResp },
  } = useMyForm({
    api: async data => {
      const submitForm = { ...data, mailProvider: EMAIL_PROVIDER.SMTP };
      return onUpdate(submitForm);
    },
    validationSchema,
  });

  useEffect(() => {
    if (form) {
      reset(form);
    }
  }, [form]);

  useEffect(() => {
    if (submitResp) {
      toast.success('Update Email configuration success');
    }
  }, [submitResp]);

  const allFields = watch();

  useEffect(() => {
    if (isValid && allFields) {
      onConfigurationChange({
        ...allFields,
        mailProvider: EMAIL_PROVIDER.SMTP,
      });
    }
  }, [isValid, allFields]);

  useEffect(() => {
    switch (allFields.encryption) {
      case 'TLS':
        setValue('port', 587);
        break;
      case 'SSL':
        setValue('port', 465);
        break;
      default:
        break;
    }
  }, [allFields.encryption]);

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
              SMTP URL <span className="text-danger">*</span>
            </Label>
            <Input
              invalid={!!errors.url}
              type="text"
              name="url"
              id="smtpURL"
              placeholder="Enter SMTP URL"
              innerRef={register}
            />
            <FormHookErrorMessage error={errors.url} />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label>
              Encryption <span className="text-danger">*</span>
            </Label>
            <Input
              invalid={!!errors.encryption}
              type="select"
              name="encryption"
              id="smtpEncryption"
              innerRef={register}
            >
              <option value="">Select Encryption</option>
              <option value="TLS">TLS</option>
              <option value="SSL">SSL</option>
            </Input>
            <FormHookErrorMessage error={errors.encryption} />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label>
              PORT <span className="text-danger">*</span>
            </Label>
            <Input
              invalid={!!errors.port}
              type="number"
              name="port"
              id="smtpPort"
              placeholder="Enter SMTP PORT"
              innerRef={register}
            />
            <FormHookErrorMessage error={errors.port} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>
              Username <span className="text-danger">*</span>
            </Label>
            <Input
              invalid={!!errors.username}
              type="text"
              name="username"
              id="smtpUsername"
              placeholder="Enter SMTP UserName"
              innerRef={register}
            />
            <FormHookErrorMessage error={errors.username} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>
              Password <span className="text-danger">*</span>
            </Label>
            <Input
              invalid={!!errors.password}
              type="password"
              name="password"
              id="smtpPassword"
              placeholder="Enter SMTP Password"
              innerRef={register}
            />
            <FormHookErrorMessage error={errors.password} />
          </FormGroup>
        </Col>
      </Row>
      <SubmitButton isLoading={isLoading} disabled={!isValid || !isDirty} />
    </Form>
  );
};

SMTPForm.propTypes = {
  form: PropTypes.object,
  onUpdate: PropTypes.func,
  onConfigurationChange: PropTypes.func,
};

export default SMTPForm;
