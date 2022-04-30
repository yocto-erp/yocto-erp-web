import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Input } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import SearchButton from "../../../components/button/SearchButton";
import { useListFilter } from "../../../components/ListWidget/constants";
import DateSelect from "../../../components/date/DateSelect";
import SelectSubject from "../../partner/subject/components/SelectSubject";
import messages from "../messages";
import InputAsyncTagging from "../../../components/Form/InputAsyncTagging";
import taggingApi from "../../../libs/apis/tagging.api";

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
    <Form onSubmit={onSubmit}>
      <div className="form-inline">
        <FormattedMessage {...messages.listPageFilterName}>
          {msg => (
            <Input
              type="text"
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

        <div className="mr-2 mt-2 mt-md-0">
          <FormattedMessage {...messages.listPageFilterFromDate}>
            {msg => (
              <DateSelect
                placeholder={msg}
                id="fromDate"
                value={startDate}
                onChange={setStartDate}
                isClearable
              />
            )}
          </FormattedMessage>
        </div>

        <div className="mr-2 mt-2 mt-md-0">
          <FormattedMessage {...messages.listPageFilterToDate}>
            {msg => (
              <DateSelect
                placeholder={msg}
                id="toDate"
                value={endDate}
                minDate={startDate}
                onChange={setEndDate}
                isClearable
              />
            )}
          </FormattedMessage>
        </div>
        <SearchButton className="mt-2 mt-md-0" />
      </div>
    </Form>
  );
};

export default Filter;
