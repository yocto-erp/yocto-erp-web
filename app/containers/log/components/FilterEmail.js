import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import SearchButton from '../../../components/button/SearchButton';
import { useListFilter } from '../../../components/ListWidget/constants';
import DateSelect from '../../../components/date/DateSelect';

const FilterEmail = () => {
  const { searchByFilter, filter } = useListFilter();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {},
  });
  const onSubmit = handleSubmit(val => {
    const { search } = val;
    searchByFilter({ search, fromDate, toDate });
  });

  useEffect(() => {
    reset(filter);
  }, [filter]);
  return (
    <Form onSubmit={onSubmit} inline>
      <FormGroup>
        <Label className="mr-2">Search</Label>
        <Input
          type="search"
          name="search"
          className="mr-2"
          placeholder="Search By From or To"
          style={{ width: '250px' }}
          innerRef={register}
        />
      </FormGroup>
      <FormGroup>
        <div className="form-inline mr-2">
          <Label htmlFor="fromDate" className="mr-2">
            From Date
          </Label>
          <DateSelect
            placeholder="Select From Date"
            id="fromDate"
            value={fromDate}
            onChange={setFromDate}
            isClearable
          />
          <Label htmlFor="toDate" className="mr-2 ml-2">
            To Date
          </Label>
          <DateSelect
            placeholder="Select To Date"
            id="toDate"
            value={toDate}
            minDate={fromDate}
            onChange={setToDate}
            isClearable
          />
        </div>
      </FormGroup>
      <SearchButton />
    </Form>
  );
};

export default FilterEmail;
