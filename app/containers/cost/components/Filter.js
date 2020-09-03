import React from 'react';
import { PropTypes } from 'prop-types';
import { Input, Label, FormGroup, Form } from 'reactstrap';
import { useForm } from 'react-hook-form';
import 'react-day-picker/lib/style.css';
import SearchButton from '../../../components/button/SearchButton';
import { useListFilter } from '../../../components/ListWidget/constants';
const Filter = ({ data }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: data,
  });
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
          placeholder="Search..."
          innerRef={register}
        />
        <SearchButton />
      </FormGroup>
    </Form>
  );
};
Filter.propTypes = {
  data: PropTypes.object,
};

export default Filter;
