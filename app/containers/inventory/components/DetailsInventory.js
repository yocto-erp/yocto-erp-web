import React from 'react';
import { FormGroup, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { useFieldArray } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import CreateButton from '../../../components/button/CreateButton';
import DetailInventory from './DetailInventory';

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
            <DetailInventory
              key={uuidv4()}
              control={control}
              errors={errors}
              register={register}
              getValues={getValues}
              setValue={setValue}
              item={item}
              index={index}
              remove={remove}
            />
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
