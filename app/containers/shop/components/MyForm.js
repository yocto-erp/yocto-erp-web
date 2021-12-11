import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import { useHookCRUDForm } from '../../../libs/hooks/useHookCRUDForm';
import shopApi from '../../../libs/apis/shop.api';
import Widget from '../../../components/Widget/Widget';
import SubmitButton from '../../../components/button/SubmitButton';
import BackButton from '../../../components/button/BackButton';
import { ERROR } from '../../../components/Form/messages';
import FormHookErrorMessage from '../../../components/Form/FormHookErrorMessage';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(ERROR.required),
});

const { create, update, read } = shopApi;

function MyForm({ id }) {
  const {
    register,
    submit,
    errors,
    state: { isLoading },
    formState: { isDirty, isValid },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update shop ${resp.name} success`
          : `Create shop ${resp.name} success`,
      );
    },
    mappingToForm: form => ({
      name: form.name,
      address: form.address,
    }),
    validationSchema,
    initForm: {
      name: '',
      address: '',
    },
    id,
  });

  const form = React.useMemo(
    () => (
      <Form onSubmit={submit} noValidate formNoValidate>
        <FormGroup>
          <Label for="name" className="mr-sm-2">
            Name
          </Label>
          <Input
            invalid={!!errors.name}
            type="text"
            name="name"
            innerRef={register}
            id="name"
            placeholder="Shop Name"
          />
          <FormHookErrorMessage error={errors.name} />
        </FormGroup>
        <FormGroup>
          <Label for="address" className="required">
            Address
          </Label>
          <Input
            type="text"
            name="address"
            innerRef={register}
            id="address"
            placeholder="Shop Address"
          />
        </FormGroup>
        <BackButton className="mr-2" />
        <SubmitButton disabled={!isValid || !isDirty} isLoading={isLoading} />
      </Form>
    ),
    [errors, isLoading, submit, register],
  );
  return <Widget>{form}</Widget>;
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyForm.defaultProps = {};

export default MyForm;
