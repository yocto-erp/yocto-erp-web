import React, { useEffect } from "react";
import { Button, Form, Input } from "reactstrap";
import { useForm } from "react-hook-form";
import { useListFilter } from "../../../../components/ListWidget/constants";
import SearchButton from "../../../../components/button/SearchButton";
import useStudentConfigure from "../../../../libs/hooks/useStudentConfigure";

const Filter = () => {
  const { searchByFilter, filter } = useListFilter();
  const { handleSubmit, register, reset } = useForm({
    defaultValues: { month: null },
  });
  const onSubmit = handleSubmit(val => searchByFilter(val));

  useEffect(() => {
    reset(filter);
  }, [filter]);
  const { configure } = useStudentConfigure();

  return configure && configure.classes && configure.classes.length ? (
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
  ) : null;
};

export default Filter;
