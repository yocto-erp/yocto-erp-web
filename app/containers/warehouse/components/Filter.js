import React, { useEffect } from "react";
import { Form, Input } from "reactstrap";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useListFilter } from "../../../components/ListWidget/constants";
import SearchButton from "../../../components/button/SearchButton";
import { commonMessage } from "../../messages";

const Filter = () => {
  const { searchByFilter, filter } = useListFilter();
  const { handleSubmit, register, reset } = useForm({
    defaultValues: filter || {},
  });

  const onSubmit = handleSubmit(val => searchByFilter(val));

  useEffect(() => {
    reset(filter);
  }, [filter]);

  return (
    <Form inline onSubmit={onSubmit} noValidate>
      <FormattedMessage {...commonMessage.searchByName}>
        {msg => (
          <Input
            type="search"
            name="search"
            className="mr-2 mt-2 mt-md-0"
            innerRef={register}
            id="search"
            placeholder={msg}
          />
        )}
      </FormattedMessage>

      <SearchButton />
    </Form>
  );
};

export default Filter;
