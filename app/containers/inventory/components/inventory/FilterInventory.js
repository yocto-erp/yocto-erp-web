import React, { useState } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useListFilter } from '../../../../components/ListWidget/constants';
import SearchButton from '../../../../components/button/SearchButton';
import WarehouseSelect from '../../../../components/common/warehouse/WarehouseSelect';
import 'react-datepicker/dist/react-datepicker.css';

const FilterInventory = ({ data }) => {
  const [startDate, setStartDate] = useState(data.startDate);
  const [endDate, setEndDate] = useState(data.endDate);
  const setFilter = useListFilter();
  const { handleSubmit, register, control } = useForm({
    defaultValues: data,
  });
  const onSubmit = handleSubmit(val => {
    const { search } = val;
    const warehouseId = val.warehouse ? val.warehouse.id : null;
    setFilter({ warehouseId, search, startDate, endDate });
  });

  return (
    <Form inline onSubmit={onSubmit} noValidate>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="warehouseId" className="mr-sm-2">
          Warehouse
        </Label>
        <div style={{ width: '150px' }}>
          <Controller
            defaultValue={null}
            name="warehouse"
            control={control}
            id="warehouseId"
            placeholder="Warehouse Name"
            as={WarehouseSelect}
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
          style={{ width: '200px' }}
          innerRef={register}
          id="search"
          placeholder="Search By Inventory Name"
        />
      </FormGroup>
      <>
        <FormGroup>
          <Label className="mr-2">StartDate</Label>
          <DatePicker
            id="startDate"
            className="form-control mr-2"
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
          <Label className="mr-2">EndDate</Label>
          <DatePicker
            id="endDate"
            className="form-control mr-2"
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </FormGroup>
      </>
      <SearchButton />
    </Form>
  );
};

FilterInventory.propTypes = {
  data: PropTypes.object,
};

export default FilterInventory;
