import React, { useEffect } from "react";
import { Form, Input } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { useListFilter } from "../../../components/ListWidget/constants";
import SearchButton from "../../../components/button/SearchButton";
import InputAsyncTagging from "../../../components/Form/InputAsyncTagging";
import taggingApi from "../../../libs/apis/tagging.api";

const Filter = () => {
  const { searchByFilter, filter } = useListFilter();
  const { handleSubmit, register, reset, control } = useForm({
    defaultValues: filter || { month: null },
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
        className="mr-2"
        style={{ width: "300px" }}
        innerRef={register}
        id="search"
        placeholder="Search By Product Name, ID"
      />
      <div style={{ width: "300px" }} className="mr-2">
        <Controller
          name="tagging"
          defaultValue={[]}
          control={control}
          render={({ onChange, ...data }) => (
            <InputAsyncTagging
              {...data}
              onChange={onChange}
              loadOptionApi={taggingApi.search}
            />
          )}
        />
      </div>
      <SearchButton />
    </Form>
  );
};

export default Filter;
