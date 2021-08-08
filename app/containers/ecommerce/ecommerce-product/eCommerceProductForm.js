import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Controller } from 'react-hook-form';
import { Form } from 'reactstrap';
import { useHookCRUDForm } from '../../../libs/hooks/useHookCRUDForm';
import EcommerceProductApi from '../../../libs/apis/ecommerce/ecommerce-product.api';
import ProductSelect from '../../../components/common/product/ProductSelect';
import FormGroup from '../../../components/Form/FormGroup';
import UnitSelect from '../../../components/common/unit/UnitSelect';
import Widget from '../../../components/Widget/Widget';
import FormGroupInput from '../../../components/Form/FormGroupInput';
import InputAmount from '../../../components/Form/InputAmount';
import FormHookErrorMessage from '../../../components/Form/FormHookErrorMessage';
import Editor from '../../../components/Form/Editor';
import BackButton from '../../../components/button/BackButton';
import SubmitButton from '../../../components/button/SubmitButton';
import { transformUnNumber } from '../../../libs/utils/number.util';

const validationSchema = yup.object().shape({
  product: yup
    .object()
    .nullable()
    .required('Product is required.'),
  unit: yup
    .object()
    .nullable()
    .required('Unit is required.'),
  webDisplayName: yup
    .string()
    .max(250)
    .required('Web display name is required.'),
  shortName: yup
    .string()
    .max(64)
    .required('Short name is required'),
  price: yup
    .number()
    .transform(transformUnNumber)
    .moreThan(0),
});

const { create, update, read } = EcommerceProductApi;

const ECommerceProductForm = ({ id }) => {
  const {
    control,
    register,
    watch,
    submit,
    state: { isLoading, formData },
    formState: { isDirty, isValid, errors },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update eCommerce Product ${resp.webDisplayName} success`
          : `Create eCommerce Product ${resp.webDisplayName} success`,
      );
    },
    validationSchema,
    initForm: {
      product: null,
      unit: null,
      webDisplayName: '',
      shortName: '',
      price: '',
    },
    id,
  });

  console.log('formData', formData);

  const product = watch('product');
  return (
    <Widget>
      <Form onSubmit={submit} noValidate formNoValidate>
        <div className="row">
          <div className="col">
            <FormGroup label="Product" isRequired>
              <Controller
                name="product"
                control={control}
                defaultValue={formData.product}
                render={({ onChange, name, value, onBlur }) => (
                  <ProductSelect
                    error={errors.product}
                    value={value}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </FormGroup>
          </div>
          <div className="col">
            <FormGroup label="Unit" isRequired>
              <Controller
                name="unit"
                control={control}
                defaultValue={formData.unit}
                render={({ onChange, name, value, onBlur }) => (
                  <UnitSelect
                    error={errors.unit}
                    id="unitId"
                    productId={product?.id}
                    value={value}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormGroupInput
              name="webDisplayName"
              label="Web Display Name"
              error={errors.webDisplayName}
              register={register}
              type="text"
              isRequired
            />
          </div>
          <div className="col-md-6">
            <FormGroupInput
              name="shortName"
              label="Short Name"
              error={errors.shortName}
              register={register}
              type="text"
              isRequired
            />
          </div>
        </div>
        <FormGroup label="Price" id="price" isRequired>
          <Controller
            name="price"
            control={control}
            defaultValue=""
            render={({ onChange, value }, { invalid }) => {
              console.log('Value change', value);
              return (
                <InputAmount
                  onChange={onChange}
                  value={value}
                  invalid={invalid}
                />
              );
            }}
          />
          <FormHookErrorMessage error={errors.price} />
        </FormGroup>
        <FormGroup label="Description">
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ onChange, onBlur, value }) => (
              <Editor
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                name="subject"
                format="text"
                height={80}
              />
            )}
          />
        </FormGroup>
        <BackButton className="mr-2" />
        <SubmitButton isLoading={isLoading} disabled={!isDirty || !isValid} />
      </Form>
    </Widget>
  );
};

ECommerceProductForm.propTypes = {
  id: PropTypes.number,
};

export default ECommerceProductForm;
