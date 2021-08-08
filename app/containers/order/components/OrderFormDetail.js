import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Button, Input } from 'reactstrap';
import { Controller, useWatch } from 'react-hook-form';
import ProductSelect from '../../../components/common/product/ProductSelect';
import UnitSelect from '../../../components/common/unit/UnitSelect';
import InputNumber from '../../../components/Form/InputNumber';
import FormHookErrorMessage from '../../../components/Form/FormHookErrorMessage';
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
    <tr>
      <td>
        <Controller
          name={`details[${index}].product`}
          defaultValue={null}
          control={control}
          render={({ onChange, ...data }) => (
            <ProductSelect
              id="productId"
              placeholder="Select Product"
              error={get(errors, ['details', index, 'product'])}
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
      </td>
      <td>
        <Controller
          name={`details[${index}].unit`}
          defaultValue={null}
          error={get(errors, ['details', index, 'unit'])}
          control={control}
          id="unitId"
          placeholder="Unit Name"
          onAdded={newUnit => {
            console.log(`Added unit ${JSON.stringify(newUnit)}`);
          }}
          productId={product ? product.id : null}
          as={UnitSelect}
        />
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
        <FormHookErrorMessage
          error={get(errors, ['details', index, 'quantity'])}
        />
      </td>
      <td>
        <Controller
          type="number"
          name={`details[${index}].price`}
          control={control}
          as={InputAmount}
          defaultValue=""
          placeholder="Price"
        />
        <FormHookErrorMessage
          error={get(errors, ['details', index, 'price'])}
        />
      </td>
      <td>
        <Input
          type="text"
          invalid={!!get(errors, ['details', index, 'remark'], false)}
          name={`details[${index}].remark`}
          innerRef={register()}
          defaultValue=""
        />
        <FormHookErrorMessage
          error={get(errors, ['details', index, 'remark'])}
        />
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
