import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form } from 'reactstrap';
import SubmitButton from '../../../components/button/SubmitButton';
import FormGroup from '../../../components/Form/FormGroup';
import useSyncForm from '../../../libs/hooks/useSyncForm';

const validationPerson = Yup.object().shape({
  firstName: Yup.string().required('This field is required.'),
  lastName: Yup.string().required('This field is required.'),
});

const PersonForm = ({ onSubmitFormPerson, form = {} }) => {
  const {
    register,
    errors,
    onSubmit,
    formState: { isDirty, isValid },
  } = useSyncForm({
    form,
    validationSchema: validationPerson,
    api: async formData => onSubmitFormPerson(formData),
  });

  return React.useMemo(
    () => (
      <Form onSubmit={onSubmit} noValidate formNoValidate>
        <FormGroup
          name="firstName"
          type="text"
          error={errors.firstName}
          register={register}
          placeholder="Input your first name"
          label=""
          iconLeft={<i className="fa fa-user" />}
        />
        <FormGroup
          name="lastName"
          type="text"
          error={errors.lastName}
          register={register}
          placeholder="Input your last name"
          label=""
          iconLeft={<i className="fa fa-user" />}
        />
        <FormGroup
          name="address"
          type="text"
          register={register}
          placeholder="Input your address"
          label=""
          iconLeft={<i className="fa fa-address-book-o" />}
        />
        <SubmitButton
          className="btn-block"
          color="primary"
          disabled={!isDirty || !isValid}
        />
      </Form>
    ),
    [errors, onSubmit, register, isValid, isDirty],
  );
};

PersonForm.propTypes = {
  onSubmitFormPerson: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};

export default PersonForm;
