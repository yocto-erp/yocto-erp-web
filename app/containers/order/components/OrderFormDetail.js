import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Button, Input } from 'reactstrap';
import { Controller, useWatch } from 'react-hook-form';
import ProductSelect from '../../../components/common/product/ProductSelect';
import UnitSelect from '../../../components/common/unit/UnitSelect';
import InputNumber from '../../../components/Form/InputNumber';
import FormErrorMessage from '../../../components/Form/FormHookErrorMessage';
import InputAmount from '../../../components/Form/InputAmount';

const OrderFormDetail = ({
  control,
  errors,
  register,
  setValue,
  item,
  index,
  remove,
}) => {
  const product = useWatch({
    control,
    name: `details[${index}].product`,
    defaultValue: item.product,
  });
  return (
    <tr key={item.id}>
      <td>
        <Controller
          name={`details[${index}].product`}
          defaultValue={item.product}
          control={control}
          render={({ onChange, ...data }) => (
            <ProductSelect
              id="productId"
              placeholder="Select Product"
              invalid={!!get(errors, ['details', index, 'product'], false)}
              onAdded={newProd => {
                setValue(`details[${index}].product`, newProd, {
                  shouldValidate: true,
                });
              }}
              onChange={val => {
                setValue(`details[${index}].unit`, null, {
                  shouldValidate: true,
                });
                onChange(val);
              }}
              {...data}
            />
          )}
        />
        <FormErrorMessage error={get(errors, ['details', index, 'product'])} />
      </td>
      <td>
        <Controller
          name={`details[${index}].unit`}
          defaultValue={item.unit}
          invalid={!!get(errors, ['details', index, 'unit'], false)}
          control={control}
          id="unitId"
          placeholder="Unit Name"
          onAdded={newUnit => {
            console.log(`Added unit ${JSON.stringify(newUnit)}`);
          }}
          productId={product ? product.id : null}
          as={UnitSelect}
        />
        <FormErrorMessage error={get(errors, ['details', index, 'unit'])} />
      </td>
      <td>
        <Controller
          invalid={!!get(errors, ['details', index, 'quantity'])}
          name={`details[${index}].quantity`}
          control={control}
          as={InputNumber}
          defaultValue={item.quantity}
          placeholder="Quantity"
        />
        <FormErrorMessage error={get(errors, ['details', index, 'quantity'])} />
      </td>
      <td>
        <Controller
          type="number"
          name={`details[${index}].price`}
          control={control}
          as={InputAmount}
          defaultValue={item.price}
          placeholder="Price"
        />
        <FormErrorMessage error={get(errors, ['details', index, 'price'])} />
      </td>
      <td>
        <Input
          type="text"
          invalid={!!get(errors, ['details', index, 'remark'], false)}
          name={`details[${index}].remark`}
          innerRef={register()}
          defaultValue={item.remark}
        />
        <FormErrorMessage error={get(errors, ['details', index, 'remark'])} />
      </td>
      <td className="action">
        <Button
          type="button"
          color="danger"
          size="sm"
          onClick={() => remove(index)}
        >
          <i className="fi flaticon-trash" />{' '}
        </Button>
      </td>
    </tr>
  );
};

OrderFormDetail.propTypes = {
  control: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getValues: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  item: PropTypes.any,
  index: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
};
export default OrderFormDetail;
