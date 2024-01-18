import React, { useEffect } from "react";
import { Button, Form, Input } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useListFilter } from "../../../components/ListWidget/constants";
import SearchButton from "../../../components/button/SearchButton";
import StudentClassSelect from "../student-class/components/StudentClassSelect";
import { STUDENT_STATUS_LIST } from "../constants";
import { listPageMessage } from "../messages";
import { commonMessage } from "../../messages";

const Filter = () => {
  const { searchByFilter, filter } = useListFilter();
  console.log(filter);
  const { handleSubmit, register, reset, control } = useForm({
    defaultValues: filter || {},
  });

  useEffect(() => {
    reset(filter || {});
  }, [filter]);
  const onSubmit = handleSubmit(val => searchByFilter(val));

  return (
    <Form inline onSubmit={onSubmit} noValidate>
      <FormattedMessage {...listPageMessage.filterSearch}>
        {msg => (
          <Input
            type="search"
            name="search"
            className="mr-2"
            style={{ width: "300px" }}
            innerRef={register}
            id="search"
            placeholder={msg}
          />
        )}
      </FormattedMessage>

      <Input name="status" type="select" innerRef={register} className="mr-2">
        <option value="">Trạng thái</option>
        {STUDENT_STATUS_LIST.map(t => (
          <FormattedMessage key={t.id} {...listPageMessage[`status${t.id}`]}>
            {msg => (
              <option key={t.id} value={t.id}>
                {msg}
              </option>
            )}
          </FormattedMessage>
        ))}
      </Input>
      <div style={{ width: "300px" }}>
        <Controller
          name="class"
          control={control}
          defaultValue={null}
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
      <SearchButton className="ml-2" />
      <Button
        color="danger"
        className="ml-2"
        onClick={() => {
          reset({});
          searchByFilter({});
        }}
        type="button"
      >
        <FormattedMessage {...commonMessage.btnReset} />
      </Button>
    </Form>
  );
};

export default Filter;
