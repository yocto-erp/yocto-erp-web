import React, { useEffect } from "react";
import { Form, Input } from "reactstrap";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useListFilter } from "../../../../components/ListWidget/constants";
import SearchButton from "../../../../components/button/SearchButton";
import messages from "../messages";

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
      <FormattedMessage {...messages.listPageSearchName}>
        {msg => (
          <Input
            type="search"
            name="search"
            className="mr-2"
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
