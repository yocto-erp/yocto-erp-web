import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { useListFilter } from "../../../../components/ListWidget/constants";
import SearchButton from "../../../../components/button/SearchButton";
import WarehouseSelect from "../../../../components/common/warehouse/WarehouseSelect";
import "react-datepicker/dist/react-datepicker.css";
import DateSelect from "../../../../components/date/DateSelect";
import FormGroupInput from "../../../../components/Form/FormGroupInput";

const FilterInventory = () => {
  const { searchByFilter, filter } = useListFilter();
  const [startDate, setStartDate] = useState(filter?.startDate);
  const [endDate, setEndDate] = useState(filter?.endDate);
  const { handleSubmit, register, control, reset } = useForm({
    defaultValues: {},
  });

  const onSubmit = handleSubmit(val => {
    console.log("onsubmit", val);
    const { name } = val;
    searchByFilter({ warehouse: val.warehouse, name, startDate, endDate });
  });

  useEffect(() => {
    console.log(filter);
    reset(filter);
  }, [filter]);

  return (
    <Form inline onSubmit={onSubmit} noValidate>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="warehouseId" className="mr-sm-2 sr-only">
          Warehouse
        </Label>
        <div style={{ width: "150px" }}>
          <Controller
            defaultValue={null}
            name="warehouse"
            control={control}
            id="warehouseId"
            render={({ onChange, value }, { invalid }) => (
              <WarehouseSelect
                placeholder="Select Warehouse"
                onChange={onChange}
                value={value}
                invalid={invalid}
              />
            )}
          />
        </div>
      </FormGroup>
      <FormGroupInput
        className="mb-2 mr-sm-2 mb-sm-0"
        name="name"
        label=""
        register={register}
        placeholder="Search By Inventory Name"
      />

      <FormGroup className="mr-2">
        <Label className="mr-2 sr-only">StartDate</Label>
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
        <Label className="pr-2 sr-only">EndDate</Label>
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
