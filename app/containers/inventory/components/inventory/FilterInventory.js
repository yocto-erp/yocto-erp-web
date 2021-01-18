import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useListFilter } from '../../../../components/ListWidget/constants';
import SearchButton from '../../../../components/button/SearchButton';
import WarehouseSelect from '../../../../components/common/warehouse/WarehouseSelect';
import 'react-datepicker/dist/react-datepicker.css';

const FilterInventory = () => {
  const toDate = new Date();
  const prevDate = new Date();
  prevDate.setDate(new Date().getDate() - 7);
  const [startDate, setStartDate] = useState(filter?.startDate || prevDate);
  const [endDate, setEndDate] = useState(filter?.endDate || toDate);
  const { searchByFilter, filter } = useListFilter();
  const { handleSubmit, register, control, reset } = useForm({
    defaultValues: filter || {
      startDate: prevDate,
      endDate: toDate,
    },
  });

  const onSubmit = handleSubmit(val => {
    const warehouseId = val.warehouseId ? val.warehouseId.id : null;
    searchByFilter({ ...val, warehouseId });
  });

  useEffect(() => {
    reset(filter);
  }, [filter]);

  return (
    <Form inline onSubmit={onSubmit} noValidate>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="warehouseId" className="mr-sm-2">
          Warehouse
        </Label>
        <div style={{ width: '150px' }}>
          <Controller
            defaultValue={null}
            name="warehouseId"
            control={control}
            id="warehouseId"
            placeholder="Select Warehouse"
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
      <FormGroup className="mr-2">
        <Label className="mr-2">StartDate</Label>
        <Controller
          name="startDate"
          control={control}
          defaultValue={filter?.startDate || null}
          render={({ onChange, onBlur, value }) => (
            <DatePicker
              className="form-control pr-2"
              onChange={val => {
                onChange(val);
                setStartDate(val);
              }}
              isClearable
              onBlur={onBlur}
              selected={value}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          )}
        />
      </FormGroup>
      <FormGroup className="mr-2">
        <Label className="pr-2">EndDate</Label>
        <Controller
          name="endDate"
          control={control}
          defaultValue={filter?.endDate || null}
          render={({ onChange, onBlur, value }) => (
            <DatePicker
              id="endDate"
              className="form-control pr-2"
              onChange={val => {
                onChange(val);
                setEndDate(val);
              }}
              isClearable
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              onBlur={onBlur}
              selected={value}
            />
          )}
        />
      </FormGroup>
      <SearchButton />
    </Form>
  );
};

export default FilterInventory;
