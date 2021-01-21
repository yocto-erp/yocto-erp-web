import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import { useListFilter } from '../../../../components/ListWidget/constants';
import SearchButton from '../../../../components/button/SearchButton';
import WarehouseSelect from '../../../../components/common/warehouse/WarehouseSelect';
import 'react-datepicker/dist/react-datepicker.css';
import DateSelect from '../../../../components/date/DateSelect';

const FilterInventory = () => {
  const [startDate, setStartDate] = useState(filter?.startDate);
  const [endDate, setEndDate] = useState(filter?.endDate);
  const { searchByFilter, filter } = useListFilter();
  const { handleSubmit, register, control, reset } = useForm({
    defaultValues: {},
  });

  const onSubmit = handleSubmit(val => {
    const warehouseId = val.warehouseId ? val.warehouseId.id : null;
    const { name } = val;
    searchByFilter({ warehouseId, name, startDate, endDate });
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
        <div>
          <DateSelect
            placeholder="Select start date"
            id="fromDate"
            value={startDate}
            onChange={setStartDate}
            isClearable
          />
        </div>
      </FormGroup>
      <FormGroup className="mr-2">
        <Label className="pr-2">EndDate</Label>
        <div>
          <DateSelect
            placeholder="Select end date"
            id="toDate"
            value={endDate}
            minDate={startDate}
            onChange={setEndDate}
            isClearable
          />
        </div>
      </FormGroup>
      <SearchButton />
    </Form>
  );
};

export default FilterInventory;
