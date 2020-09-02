import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Button, FormFeedback, Input } from 'reactstrap';
import { Controller, useWatch } from 'react-hook-form';
import ProductSelect from '../../../components/common/product/ProductSelect';
import UnitSelect from '../../../components/common/unit/UnitSelect';

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
        <FormFeedback>
          {get(errors, ['details', index, 'product', 'message'], '')}
        </FormFeedback>
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
        <FormFeedback>
          {get(errors, ['details', index, 'unit', 'message'], '')}
        </FormFeedback>
      </td>
      <td>
        <Input
          type="number"
          invalid={!!get(errors, ['details', index, 'quantity'], false)}
          name={`details[${index}].quantity`}
          innerRef={register()}
          defaultValue={item.quantity} // make sure to set up defaultValue
        />
        <FormFeedback>
          {get(errors, ['details', index, 'quantity', 'message'], '')}
        </FormFeedback>
      </td>
      <td>
        <Input
          type="number"
          invalid={!!get(errors, ['details', index, 'price'], false)}
          name={`details[${index}].price`}
          innerRef={register()}
          defaultValue={item.price} // make sure to set up defaultValue
        />
        <FormFeedback>
          {get(errors, ['details', index, 'price', 'message'], '')}
        </FormFeedback>
      </td>
      <td>
        <Input
          type="text"
          invalid={!!get(errors, ['details', index, 'remark'], false)}
          name={`details[${index}].remark`}
          innerRef={register()}
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
