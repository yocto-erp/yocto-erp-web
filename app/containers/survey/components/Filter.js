import React from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useListFilter } from '../../../components/ListWidget/constants';
import SearchButton from '../../../components/button/SearchButton';

const Filter = ({ data }) => {
  const { handleSubmit, register } = useForm({
    defaultValues: data,
  });
  const setFilter = useListFilter();
  const onSubmit = handleSubmit(val => setFilter(val));

  return (
    <Form inline onSubmit={onSubmit} noValidate>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Input
          type="search"
          name="search"
          className="mr-2"
          style={{ width: '300px' }}
          innerRef={register}
          id="search"
          placeholder="Search Person Name or Email"
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
