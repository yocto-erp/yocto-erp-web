import React from 'react';
import { Form, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { useListFilter } from '../../../../components/ListWidget/constants';
import SearchButton from '../../../../components/button/SearchButton';
import MonthSelect from '../../../../components/date/MonthSelect';

const Filter = ({ data }) => {
  const { handleSubmit, register, control } = useForm({
    defaultValues: data,
  });
  const setFilter = useListFilter();
  const onSubmit = handleSubmit(val => setFilter(val));

  return (
    <Form inline onSubmit={onSubmit} noValidate>
      <Input
        type="search"
        name="search"
        className="mr-2"
        style={{ width: '300px' }}
        innerRef={register}
        id="search"
        placeholder="Search By Name"
      />
      <Controller
        control={control}
        name="month"
        className="pr-2"
        placeholder="Filter By Month"
        defaultValue=""
        as={MonthSelect}
      />
      <SearchButton className="ml-2" />
    </Form>
  );
};

Filter.propTypes = {
  data: PropTypes.object,
};

export default Filter;
