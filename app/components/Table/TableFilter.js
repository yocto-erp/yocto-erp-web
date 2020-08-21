import React from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useTableFilter } from './constants';

const TableFilter = ({ filter }) => {
  const { handleSubmit, register } = useForm({
    defaultValues: { ...filter },
  });
  const setFilter = useTableFilter();
  const onSubmit = handleSubmit(val => setFilter(val));

  return (
    <Form inline onSubmit={onSubmit} noValidate>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="exampleEmail" className="mr-sm-2">
          Email
        </Label>
        <Input
          type="email"
          name="email"
          innerRef={register}
          id="exampleEmail"
          placeholder="something@idk.cool"
        />
      </FormGroup>
    </Form>
  );
};

TableFilter.propTypes = {
  filter: PropTypes.object,
};

export default TableFilter;
