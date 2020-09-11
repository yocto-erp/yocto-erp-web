import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PropTypes } from 'prop-types';
import { Input, Label, FormGroup, Form } from 'reactstrap';
import { useForm } from 'react-hook-form';
import SearchButton from '../../../components/button/SearchButton';
import { useListFilter } from '../../../components/ListWidget/constants';

const Filter = ({ data }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: data,
  });
  const prevDate = new Date();
  prevDate.setDate(new Date().getDate() - 7);
  const [startDate, setStartDate] = useState(prevDate);
  const [endDate, setEndDate] = useState(new Date());

  const setFilter = useListFilter();
  const onSubmit = handleSubmit(val => setFilter(val));
  return (
    <Form onSubmit={onSubmit} inline>
      <FormGroup>
        <Label className="mr-2">Name</Label>
        <Input
          type="text"
          name="search"
          className="mr-2"
          placeholder="Search cost by title"
          style={{ width: '250px' }}
          innerRef={register}
        />
      </FormGroup>
      <>
        <FormGroup>
          <Label className="mr-2">Range Date</Label>
          <DatePicker
            id="startDate"
            className="form-control mr-2"
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
          <Label className="mr-2">To</Label>
          <DatePicker
            id="endDate"
            className="form-control mr-2"
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
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
