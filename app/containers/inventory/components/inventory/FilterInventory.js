import React from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useListFilter } from '../../../../components/ListWidget/constants';
import SearchButton from '../../../../components/button/SearchButton';
import WarehouseSelect from '../../../../components/common/warehouse/WarehouseSelect';

const FilterInventory = ({ data }) => {
  const { handleSubmit, register, control } = useForm({
    defaultValues: data,
  });
  const setFilter = useListFilter();
  const onSubmit = handleSubmit(val => {
    const { search } = val;
    const warehouseId = val.warehouse ? val.warehouse.id : null;
    setFilter({ warehouseId, search });
  });

  return (
    <Form inline onSubmit={onSubmit} noValidate>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="productId" className="mr-sm-2">
          Warehouse
        </Label>
        <div style={{ width: '250px' }} className="">
          <WarehouseSelect
            name="warehouse"
            control={control}
            id="warehouseId"
            placeholder="Warehouse Name"
          />
        </div>
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="name" className="mr-sm-2">
          Name
        </Label>
        <Input
          type="search"
          name="search"
          className="mr-2"
          style={{ width: '300px' }}
          innerRef={register}
          id="search"
          placeholder="Search By Inventory Name"
        />
      </FormGroup>
      <SearchButton />
    </Form>
  );
};

FilterInventory.propTypes = {
  data: PropTypes.object,
};

export default FilterInventory;
