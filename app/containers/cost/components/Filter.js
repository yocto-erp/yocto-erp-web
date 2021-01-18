import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import SearchButton from '../../../components/button/SearchButton';
import { useListFilter } from '../../../components/ListWidget/constants';

const Filter = () => {
  const toDate = new Date();
  const prevDate = new Date();
  prevDate.setDate(new Date().getDate() - 7);
  const { searchByFilter, filter } = useListFilter();
  console.log(filter);
  const [startDate, setStartDate] = useState(filter?.startDate || prevDate);
  const [endDate, setEndDate] = useState(filter?.endDate || toDate);
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    reset(filter);
  }, [filter]);
  const onSubmit = handleSubmit(val => searchByFilter(val));
  return (
    <Form onSubmit={onSubmit} inline>
      <FormGroup>
        <Label className="mr-2">Name</Label>
        <Input
          type="text"
          name="search"
          className="mr-2"
          placeholder="Search By Name"
          style={{ width: '250px' }}
          innerRef={register}
        />
      </FormGroup>
      <FormGroup className="mr-2">
        <Label className="mr-2">StartDate</Label>
        <Controller
          name="startDate"
          control={control}
          defaultValue={filter?.startDate || null}
          render={({ onChange, onBlur, value }) => (
            <DatePicker
              className="form-control pr-2"
              onChange={val => {
                onChange(val);
                setStartDate(val);
              }}
              isClearable
              onBlur={onBlur}
              selected={value}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          )}
        />
      </FormGroup>
      <FormGroup className="mr-2">
        <Label className="pr-2">EndDate</Label>
        <Controller
          name="endDate"
          control={control}
          defaultValue={filter?.endDate || null}
          render={({ onChange, onBlur, value }) => (
            <DatePicker
              id="endDate"
              className="form-control pr-2"
              onChange={val => {
                onChange(val);
                setEndDate(val);
              }}
              isClearable
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              onBlur={onBlur}
              selected={value}
            />
          )}
        />
      </FormGroup>
      <SearchButton />
    </Form>
  );
};

export default Filter;
