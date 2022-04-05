import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import SearchButton from "../../../components/button/SearchButton";
import { useListFilter } from "../../../components/ListWidget/constants";
import DateSelect from "../../../components/date/DateSelect";
import SelectSubject from "../../partner/subject/components/SelectSubject";

const Filter = () => {
  const { searchByFilter, filter } = useListFilter();
  const [startDate, setStartDate] = useState(filter?.startDate);
  const [endDate, setEndDate] = useState(filter?.endDate);
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    reset(filter);
  }, [filter]);
  const onSubmit = handleSubmit(val => {
    searchByFilter({ ...val, startDate, endDate });
  });
  return (
    <Form onSubmit={onSubmit} inline>
      <FormGroup>
        <Label className="mr-2 sr-only">Name</Label>
        <Input
          type="text"
          name="search"
          className="mr-2"
          placeholder="Search By Name"
          style={{ width: "250px" }}
          innerRef={register}
        />
      </FormGroup>
      <FormGroup className="mr-2">
        <Label className="mr-2 sr-only">Name</Label>
        <div style={{ width: "250px" }}>
          <Controller
            name="subject"
            defaultValue={null}
            control={control}
            render={({ onChange, ...data }, { invalid }) => (
              <SelectSubject
                id="subject"
                placeholder="Choose Partner"
                creatable={false}
                invalid={invalid}
                onChange={val => {
                  onChange(val);
                }}
                {...data}
              />
            )}
          />
        </div>
      </FormGroup>
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

export default Filter;
