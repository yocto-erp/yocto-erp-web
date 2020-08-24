import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import { useWatch } from 'react-hook-form';
import { useHookCRUDForm } from '../../../libs/hooks/useHookCRUDForm';
import warehouseApi from '../../../libs/apis/warehouse.api';
import Widget from '../../../components/Widget/Widget';
import SubmitButton from '../../../components/button/SubmitButton';
import BackButton from '../../../components/button/BackButton';
import ProductSelect from '../../../components/common/product/ProductSelect';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required.'),
  product: Yup.object()
    .required('Product is required')
    .nullable(true),
});

const { create, update, read } = warehouseApi;

function MyForm({ id }) {
  const {
    register,
    submit,
    errors,
    control,
    getValues,
    state: { isLoading },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      console.log(`Success: ${JSON.stringify(resp)}`);
      toast.success(
        id ? 'Update Warehouse success' : 'Create warehouse success',
      );
    },
    mappingToForm: form => {
      console.log(`Mapping to form`);
      return {
        name: form.name,
        address: form.address,
      };
    },
    validationSchema,
    initForm: {
      product: { value: 'forest', label: 'Forest', color: '#00875A' },
      name: 'warehouse test',
    },
    id,
  });
  const product = useWatch({
    control,
    name: 'product', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    defaultValue: '', // default value before the render
  });
  const form = React.useMemo(() => {
    console.log('cache');
    return (
      <Form onSubmit={submit} noValidate formNoValidate>
        <FormGroup>
          <Label for="product" className="mr-sm-2">
            Product
          </Label>
          <ProductSelect
            invalid={!!errors.product}
            name="product"
            control={control}
            id="product"
            placeholder="Warehouse Name"
            onAdded={newProduct => {
              console.log(`Added Product ${JSON.stringify(newProduct)}`);
            }}
          />
          {JSON.stringify(getValues('product'))}
          <FormFeedback>
            {errors.product && errors.product.message}
          </FormFeedback>
          {JSON.stringify(errors)}
        </FormGroup>
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
    );
  }, [errors, isLoading, submit, register]);
  console.log('MyForm');

  return (
    <Widget>
      {form}
      {JSON.stringify(product)}
    </Widget>
  );
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

MyForm.defaultProps = {};

export default MyForm;
