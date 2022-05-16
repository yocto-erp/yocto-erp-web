import React, { useEffect } from "react";
import { Form, Input } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useListFilter } from "../../../../components/ListWidget/constants";
import SearchButton from "../../../../components/button/SearchButton";
import SelectProvider from "../../../provider/components/SelectProvider";
import messages from "../messages";

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
      <FormattedMessage {...messages.listPageSearchName}>
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
      <div style={{ width: "250px" }} className="mr-2 mt-2 mt-md-0">
        <Controller
          name="subject"
          defaultValue={null}
          control={control}
          render={({ onChange, ...data }, { invalid }) => (
            <FormattedMessage {...messages.listPageSearchProvider}>
              {msg => (
                <SelectProvider
                  id="subject"
                  placeholder={msg}
                  creatable={false}
                  invalid={invalid}
                  onChange={val => {
                    onChange(val);
                  }}
                  {...data}
                />
              )}
            </FormattedMessage>
          )}
        />
      </div>
      <SearchButton />
    </Form>
  );
};

export default Filter;
