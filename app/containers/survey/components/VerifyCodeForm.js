import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form } from 'reactstrap';
import useMyForm from '../../../libs/hooks/useMyForm';
import FormError from '../../../components/Form/FormError';
import FormGroup from '../../../components/Form/FormGroup';
import SubmitButton from '../../../components/button/SubmitButton';

const schema = Yup.object().shape({
  code: Yup.string().required('This field is required.'),
});

const VerifyCodeForm = ({ onResend, onVerify }) => {
  const {
    register,
    errors,
    onSubmit,
    formState: { isDirty, isValid },
    state: { isLoading, errors: serverErrors },
  } = useMyForm({
    validationSchema: schema,
    api: formData => onVerify(formData.code),
  });

  return (
    <Form onSubmit={onSubmit} noValidate formNoValidate>
      {serverErrors && serverErrors.length ? (
        <FormError errors={serverErrors} />
      ) : null}
      <FormGroup
        name="code"
        type="code"
        error={errors.code}
        register={register}
        placeholder="Input Code"
        label="Code"
      />
      <SubmitButton isLoading={isLoading} />
    </Form>
  );
};

VerifyCodeForm.propTypes = {
  onResend: PropTypes.func.isRequired,
  onVerify: PropTypes.func.isRequired,
};

export default VerifyCodeForm;
