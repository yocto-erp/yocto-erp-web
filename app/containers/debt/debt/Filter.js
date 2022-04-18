import React, { useEffect } from "react";
import { Form, Input } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useListFilter } from "../../../components/ListWidget/constants";
import SearchButton from "../../../components/button/SearchButton";
import { commonMessage } from "../../messages";
import SelectSubject from "../../partner/subject/components/SelectSubject";
import { LIST_DEBIT_TYPE, LIST_PAID_TYPE } from "../constants";
import messages from "../messages";

const Filter = () => {
  const { searchByFilter, filter } = useListFilter();
  const { handleSubmit, register, reset, control } = useForm({
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
            style={{ width: "300px" }}
            innerRef={register}
            id="search"
            placeholder={msg}
          />
        )}
      </FormattedMessage>
      <div style={{ width: "300px" }} className="mr-2 mt-2 mt-md-0">
        <Controller
          name="subject"
          defaultValue={null}
          control={control}
          render={({ onChange, ...data }) => (
            <SelectSubject
              id="partnerCompanyId"
              placeholder="Partner Company"
              onChange={val => {
                onChange(val);
              }}
              {...data}
            />
          )}
        />
      </div>
      <Input
        type="select"
        name="type"
        innerRef={register}
        className="mr-2 mt-2 mt-md-0"
      >
        <option value="">ALL</option>
        {[...LIST_DEBIT_TYPE, ...LIST_PAID_TYPE].map(t => (
          <FormattedMessage {...messages[`debtType${t.id}`]} key={t.id}>
            {msg => (
              <option key={t.id} value={t.id}>
                {msg}
              </option>
            )}
          </FormattedMessage>
        ))}
      </Input>
      <SearchButton className="mr-2 mt-2 mt-md-0" />
    </Form>
  );
};

export default Filter;
