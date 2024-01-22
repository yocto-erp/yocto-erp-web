import React, { useEffect } from "react";
import { Button, Form, Input } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { useListFilter } from "../../../../../components/ListWidget/constants";
import SearchButton from "../../../../../components/button/SearchButton";
import { FormRegisterStatus } from "../../../form-register/constants";
import { SelectForm } from "../../../form-register/components/SelectForm";

const Filter = () => {
  const { searchByFilter, filter } = useListFilter();
  const { handleSubmit, register, reset, control } = useForm({
    defaultValues: { month: null },
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
        className="mr-2 mt-2"
        style={{ width: "300px" }}
        innerRef={register}
        id="search"
        placeholder="Search By Name"
      />
      <Input
        type="select"
        name="status"
        className="mr-2 mt-2"
        innerRef={register}
        id="status"
      >
        <option value="">ALL Status</option>
        <option value={`${FormRegisterStatus.PAID}`}>Đã thanh toán</option>
        <option value={`${FormRegisterStatus.CONFIRMED}`}>Đã xác nhận</option>
        <option value={`${FormRegisterStatus.REQUEST}`}>Đang chờ</option>
        <option value={`${FormRegisterStatus.CANCEL}`}>Đã huỷ</option>
      </Input>
      <div style={{ width: "250px" }} className="mr-2 mt-2 mt-md-0">
        <Controller
          name="form"
          defaultValue={[]}
          control={control}
          render={({ onChange, ...data }, { invalid }) => (
            <SelectForm
              id="form"
              isMulti={false}
              placeholder="Chọn Form đăng ký"
              invalid={invalid}
              onChange={onChange}
              {...data}
            />
          )}
        />
      </div>
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
  );
};

export default Filter;
