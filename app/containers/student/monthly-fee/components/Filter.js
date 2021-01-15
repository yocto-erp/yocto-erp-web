import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import { useListFilter } from '../../../../components/ListWidget/constants';
import SearchButton from '../../../../components/button/SearchButton';
import MonthSelect from '../../../../components/date/MonthSelect';
import useStudentConfigure from '../../../../libs/hooks/useStudentConfigure';

const Filter = ({ data }) => {
  const { handleSubmit, register, control, reset } = useForm({
    defaultValues: data,
  });
  const setFilter = useListFilter();
  const onSubmit = handleSubmit(val => setFilter(val));
  const { configure } = useStudentConfigure();

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
      <Input
        type="select"
        name="class"
        className="mr-2"
        innerRef={register}
        id="class"
      >
        <option value="">ALL Classes</option>
        {(configure?.classes || []).map(t => (
          <option value={t.id} key={t.id}>
            {t.name}
          </option>
        ))}
      </Input>
      <Input
        type="select"
        name="isPaid"
        className="mr-2"
        innerRef={register}
        id="isPaid"
      >
        <option value={0}>ALL (Paid + UnPaid)</option>
        <option value={1}>UNPAID</option>
        <option value={2}>PAID</option>
      </Input>
      <Controller
        control={control}
        name="month"
        className="pr-2"
        defaultValue=""
        render={({ onChange, value, onBlur }) => (
          <MonthSelect
            onChange={onChange}
            onBlur={onBlur}
            isClearable
            value={value}
            placeholder="Filter By Month"
          />
        )}
      />
      <SearchButton className="ml-2" />
      <Button
        color="danger"
        className="ml-2"
        onClick={() => {
          reset(data);
          setFilter(data);
        }}
        type="button"
      >
        Reset
      </Button>
    </Form>
  );
};

Filter.propTypes = {
  data: PropTypes.object,
};

export default Filter;
