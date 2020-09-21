import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PropTypes } from 'prop-types';
import { Input, Label, FormGroup, Form } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import SearchButton from '../../../components/button/SearchButton';
import { useListFilter } from '../../../components/ListWidget/constants';

const Filter = ({ data }) => {
  const [startDate, setStartDate] = useState(data.startDate);
  const [endDate, setEndDate] = useState(data.endDate);
  const setFilter = useListFilter();
  const { register, handleSubmit, control } = useForm({
    defaultValues: data,
  });
  const onSubmit = handleSubmit(val => setFilter(val));
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
      <>
        <FormGroup>
          <Label className="mr-2">Range Date</Label>
          <Controller
            name="startDate"
            control={control}
            render={({ onChange, onBlur, value }) => (
              <DatePicker
                className="form-control mr-2"
                onChange={val => {
                  onChange(val);
                  setStartDate(val);
                }}
                onBlur={onBlur}
                selected={value}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
            )}
          />

          <Label className="mr-2">To</Label>
          <Controller
            name="endDate"
            control={control}
            render={({ onChange, onBlur, value }) => (
              <DatePicker
                id="endDate"
                className="form-control mr-2"
                onChange={val => {
                  onChange(val);
                  setEndDate(val);
                }}
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
      </>
      <SearchButton />
    </Form>
  );
};
Filter.propTypes = {
  data: PropTypes.object,
};

export default Filter;
