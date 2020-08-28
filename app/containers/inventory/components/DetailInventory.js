import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Button, FormFeedback, Input } from 'reactstrap';
import { useWatch } from 'react-hook-form';
import ProductSelect from '../../../components/common/product/ProductSelect';
import UnitSelect from '../../../components/common/unit/UnitSelect';

const DetailInventory = ({
  control,
  errors,
  register,
  getValues,
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
        <ProductSelect
          defaultValue={item.product}
          invalid={!!get(errors, ['details', index, 'product'], false)}
          name={`details[${index}].product`}
          control={control}
          id="productId"
          placeholder="Product Name"
          onAdded={newProduct => {
            console.log(`Added Product ${JSON.stringify(newProduct)}`);
          }}
          onChanged={val => {
            console.log(
              `Set Unit value on Product change: ${JSON.stringify(val)}`,
            );
            setValue(`details[${index}].unit`, null, {
              shouldValidate: true,
            });
          }}
        />
        <FormFeedback>
          {get(errors, ['details', index, 'product', 'message'], '')}
        </FormFeedback>
      </td>
      <td>
        <UnitSelect
          defaultValue={item.unit}
          invalid={!!get(errors, ['details', index, 'unit'], false)}
          name={`details[${index}].unit`}
          control={control}
          id="unitId"
          placeholder="Unit Name"
          onAdded={newUnit => {
            console.log(`Added unit ${JSON.stringify(newUnit)}`);
          }}
          productId={product ? product.id : null}
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

DetailInventory.propTypes = {
  control: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getValues: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  item: PropTypes.any,
  index: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
};
export default DetailInventory;
