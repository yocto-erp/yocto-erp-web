import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Input } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import SearchButton from "../../../components/button/SearchButton";
import { useListFilter } from "../../../components/ListWidget/constants";
import SelectSubject from "../../partner/subject/components/SelectSubject";
import messages from "../messages";
import InputAsyncTagging from "../../../components/Form/InputAsyncTagging";
import taggingApi from "../../../libs/apis/tagging.api";
import DateRangePicker from "../../../components/date/DateRangePicker";

const Filter = () => {
  const { searchByFilter, filter } = useListFilter();
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    reset(filter);
  }, [filter]);
  const onSubmit = handleSubmit(val => {
    console.log("Search: ", val);
    searchByFilter({ ...val });
  });
  return (
    <Form onSubmit={onSubmit}>
      <div className="form-inline">
        <FormattedMessage {...messages.listPageFilterName}>
          {msg => (
            <Input
              type="search"
              name="search"
              className="mr-2 mt-2 mt-md-0"
              placeholder={msg}
              style={{ width: "250px" }}
              innerRef={register}
            />
          )}
        </FormattedMessage>
        <div style={{ width: "400px" }} className="mr-2 mt-2 mt-md-0">
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
      </div>
      <div className="form-inline mt-2">
        <div style={{ width: "250px" }} className="mr-2 mt-2 mt-md-0">
          <Controller
            name="subject"
            defaultValue={null}
            control={control}
            render={({ onChange, ...data }, { invalid }) => (
              <FormattedMessage {...messages.listPageFilterPartner}>
                {msg => (
                  <SelectSubject
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
        <Controller
          name="dateRange"
          defaultValue={null}
          control={control}
          render={data => (
            <DateRangePicker {...data} className="mr-2 mt-2 mt-md-0" />
          )}
        />
        <SearchButton className="mt-2 mt-md-0" />
      </div>
    </Form>
  );
};

export default Filter;
