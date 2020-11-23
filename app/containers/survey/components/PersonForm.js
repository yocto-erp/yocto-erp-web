import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'reactstrap';
import * as Yup from 'yup';
import FormGroup from '../../../components/Form/FormGroup';
import SubmitButton from '../../../components/button/SubmitButton';
import useSyncForm from '../../../libs/hooks/useSyncForm';

const schema = Yup.object().shape({
  firstName: Yup.string().required('This field is required.'),
  lastName: Yup.string().required('This field is required.'),
  address: Yup.string(),
});

const SurveyUserForm = ({ onDone, form = {} }) => {
  const {
    register,
    errors,
    onSubmit,
    formState: { isDirty, isValid },
  } = useSyncForm({
    form,
    validationSchema: schema,
    api: onDone,
  });
  return (
    <Form onSubmit={onSubmit} noValidate formNoValidate>
      <FormGroup
        name="firstName"
        type="text"
        error={errors.firstName}
        register={register}
        placeholder="First Name"
        label="First Name"
      />
      <FormGroup
        name="lastName"
        type="text"
        error={errors.lastName}
        register={register}
        placeholder="Last Name"
        label="Last Name"
      />
      <FormGroup
        name="lastName"
        type="text"
        error={errors.address}
        register={register}
        placeholder="Last Name"
        label="Last Name"
      />
      <SubmitButton color="primary" disabled={!isDirty || !isValid} />
    </Form>
  );
};

SurveyUserForm.propTypes = {
  onDone: PropTypes.func.isRequired,
  form: PropTypes.object,
};

export default SurveyUserForm;
