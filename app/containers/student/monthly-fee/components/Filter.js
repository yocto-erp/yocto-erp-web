import React, { useEffect } from "react";
import { Button, Form, Input } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { useListFilter } from "../../../../components/ListWidget/constants";
import SearchButton from "../../../../components/button/SearchButton";
import MonthSelect from "../../../../components/date/MonthSelect";
import StudentClassSelect from "../../student-class/components/StudentClassSelect";

const Filter = () => {
  const { searchByFilter, filter } = useListFilter();
  const { handleSubmit, register, control, reset } = useForm({
    defaultValues: { month: null },
  });
  const onSubmit = handleSubmit(val => searchByFilter(val));

  useEffect(() => {
    reset(filter);
  }, [filter]);

  return (
    <Form inline onSubmit={onSubmit} noValidate>
      <Input
        type="search"
        name="search"
        className="mr-2 mt-2"
        style={{ width: "300px" }}
        innerRef={register}
        id="search"
        placeholder="Search By Name"
      />
      <div style={{ width: "250px" }} className="mr-2 mt-2">
        <Controller
          name="class"
          control={control}
          render={({ onChange, ...data }) => (
            <StudentClassSelect
              id="class"
              placeholder="Chọn lớp học"
              onChange={onChange}
              {...data}
            />
          )}
        />
      </div>
      <Input
        type="select"
        name="isPaid"
        className="mr-2 mt-2"
        innerRef={register}
        id="isPaid"
      >
        <option value={0}>ALL (Paid + UnPaid)</option>
        <option value={1}>UNPAID</option>
        <option value={2}>PAID</option>
      </Input>
      <Controller
        control={control}
        name="month"
        className="pr-2 mt-2"
        defaultValue=""
        render={({ onChange, value, onBlur }) => (
          <MonthSelect
            className="pr-2 mt-2"
            onChange={onChange}
            onBlur={onBlur}
            isClearable
            value={value}
            placeholder="Filter By Month"
          />
        )}
      />
      <SearchButton className="ml-2 mt-2" />
      <Button
        color="danger"
        className="ml-2 mt-2"
        onClick={() => {
          reset({});
          searchByFilter({});
        }}
        type="button"
      >
        Reset
      </Button>
    </Form>
  );
};

export default Filter;
