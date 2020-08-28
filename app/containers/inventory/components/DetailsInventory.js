import React from 'react';
import { Button, FormFeedback, FormGroup, Input, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { useFieldArray } from 'react-hook-form';
import get from 'lodash/get';
import { v4 as uuidv4 } from 'uuid';
import ProductSelect from '../../../components/common/product/ProductSelect';
import UnitSelect from '../../../components/common/unit/UnitSelect';
import CreateButton from '../../../components/button/CreateButton';

const DetailsInventory = ({
  control,
  errors,
  register,
  getValues,
  setValue,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'details',
    // keyName: "id", default to "id", you can change the key name
  });

  return (
    <FormGroup>
      <Table bordered hover striped>
        <thead>
          <tr>
            <th style={{ width: '230px' }}>Product</th>
            <th style={{ width: '170px' }}>Unit</th>
            <th style={{ width: '120px' }}>Quantity</th>
            <th style={{ width: '120px' }}>Remark</th>
            <th className="action">Action</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((item, index) => (
            <tr key={item.id}>
              <td>
                <ProductSelect
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
                      `Set Unit value on Product change: ${JSON.stringify(
                        val,
                      )}`,
                    );
                    if (!val) {
                      setValue(`details[${index}].unit`, null, {
                        shouldValidate: true,
                      });
                    }
                  }}
                />
                <FormFeedback>
                  {get(errors, ['details', index, 'product', 'message'], '')}
                </FormFeedback>
              </td>
              <td>
                <UnitSelect
                  invalid={!!get(errors, ['details', index, 'unit'], false)}
                  name={`details[${index}].unit`}
                  control={control}
                  id="unitId"
                  placeholder="Unit Name"
                  onAdded={newUnit => {
                    console.log(`Added unit ${JSON.stringify(newUnit)}`);
                  }}
                  productId={
                    getValues(`details[${index}].product`)
                      ? getValues(`details[${index}].product`).id
                      : 0
                  }
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
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5">
              <CreateButton
                size="sm"
                type="button"
                onClick={() => {
                  append({
                    id: uuidv4(),
                    product: null,
                    unit: null,
                    quantity: 0,
                    remark: '',
                  });
                }}
              >
                Add
              </CreateButton>
            </td>
          </tr>
        </tfoot>
      </Table>
    </FormGroup>
  );
};

DetailsInventory.propTypes = {
  control: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getValues: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default DetailsInventory;
