import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Button, FormFeedback, Input } from 'reactstrap';
import { Controller, useWatch } from 'react-hook-form';
import ProductSelect from '../../../components/common/product/ProductSelect';
import UnitSelect from '../../../components/common/unit/UnitSelect';
import InputNumber from '../../../components/Form/InputNumber';
import FormErrorMessage from '../../../components/Form/FormHookErrorMessage';

const InventoryFormDetail = ({
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
    name: `details[${index}].product`, // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    defaultValue: item.product, // default value before the render
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
          defaultValue={item.unit}
          error={get(errors, ['details', index, 'unit', 'message'], '')}
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
          invalid={!!get(errors, ['details', index, 'quantity'], false)}
          name={`details[${index}].quantity`}
          control={control}
          as={InputNumber}
          defaultValue={item.quantity}
          placeholder="Amount"
        />
        <FormErrorMessage error={get(errors, ['details', index, 'quantity'])} />
      </td>
      <td>
        <Input
          type="text"
          invalid={!!get(errors, ['details', index, 'serialCode'], false)}
          name={`details[${index}].serialCode`}
          innerRef={register}
          placeholder="Input Serial"
          defaultValue={item.serialCode} // make sure to set up defaultValue
        />
        <FormErrorMessage
          error={get(errors, ['details', index, 'serialCode'])}
        />
      </td>
      <td>
        <Input
          type="text"
          invalid={!!get(errors, ['details', index, 'remark'], false)}
          name={`details[${index}].remark`}
          innerRef={register}
          defaultValue={item.remark} // make sure to set up defaultValue
        />
        <FormFeedback>
          {get(errors, ['details', index, 'remark', 'message'], '')}
        </FormFeedback>
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

InventoryFormDetail.propTypes = {
  control: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getValues: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  item: PropTypes.any,
  index: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
};
export default InventoryFormDetail;
