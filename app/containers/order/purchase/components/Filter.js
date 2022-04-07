import React, { useEffect } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { useListFilter } from "../../../../components/ListWidget/constants";
import SearchButton from "../../../../components/button/SearchButton";
import SelectSubject from "../../../partner/subject/components/SelectSubject";

const Filter = () => {
  const { searchByFilter, filter } = useListFilter();

  const { handleSubmit, register, control, reset } = useForm({
    defaultValues: {},
  });
  useEffect(() => {
    reset(filter);
  }, [filter]);

  const onSubmit = handleSubmit(val => {
    searchByFilter(val);
  });
  return (
    <Form inline onSubmit={onSubmit} noValidate>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="name" className="mr-sm-2 sr-only">
          Name
        </Label>
        <Input
          type="search"
          name="search"
          className="mr-2"
          style={{ width: "300px" }}
          innerRef={register}
          id="search"
          placeholder="Search By Name"
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
      <SearchButton />
    </Form>
  );
};

export default Filter;
