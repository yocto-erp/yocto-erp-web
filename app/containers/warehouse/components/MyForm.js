import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import { useHookCRUDForm } from '../../../libs/hooks/useHookCRUDForm';
import warehouseApi from '../../../libs/apis/warehouse.api';
import Widget from '../../../components/Widget/Widget';
import SubmitButton from '../../../components/button/SubmitButton';
import BackButton from '../../../components/button/BackButton';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required.'),
});

const { create, update, read } = warehouseApi;

function MyForm({ id }) {
  const {
    register,
    submit,
    errors,
    state: { isLoading },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update Warehouse ${resp.name} success`
          : `Create warehouse ${resp.name} success`,
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
            placeholder="Warehouse Name"
          />
          <FormFeedback>{errors.name && errors.name.message}</FormFeedback>
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
            placeholder="Warehouse Address"
          />
        </FormGroup>
        <BackButton className="mr-2" />
        <SubmitButton isLoading={isLoading} />
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
