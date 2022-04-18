import React, { useEffect, useState } from "react";
import { Form } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { useListFilter } from "../../../../components/ListWidget/constants";
import SearchButton from "../../../../components/button/SearchButton";
import WarehouseSelect from "../../../../components/common/warehouse/WarehouseSelect";
import "react-datepicker/dist/react-datepicker.css";
import DateSelect from "../../../../components/date/DateSelect";

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
      <Controller
        defaultValue={null}
        name="warehouse"
        control={control}
        id="warehouseId"
        render={({ onChange, value }, { invalid }) => (
          <WarehouseSelect
            className="mr-2 mt-md-0 mt-2"
            placeholder="Select Warehouse"
            onChange={onChange}
            value={value}
            invalid={invalid}
          />
        )}
      />
      <input
        className="form-control mr-2 mt-md-0 mt-2"
        name="name"
        ref={register}
        placeholder="Search By Inventory Name"
      />
      <div className="mr-2 mt-md-0 mt-2">
        <DateSelect
          placeholder="Select start date"
          id="fromDate"
          value={startDate}
          onChange={setStartDate}
          isClearable
        />
      </div>
      <div className="mr-2 mt-md-0 mt-2">
        <DateSelect
          placeholder="Select end date"
          id="toDate"
          value={endDate}
          minDate={startDate}
          onChange={setEndDate}
          isClearable
        />
      </div>
      <SearchButton className=" mt-md-0 mt-2" />
    </Form>
  );
};

export default FilterInventory;
