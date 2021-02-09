import React, { useEffect } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import SearchButton from '../../../components/button/SearchButton';
import { useListFilter } from '../../../components/ListWidget/constants';

const FilterUser = () => {
  const { searchByFilter, filter } = useListFilter();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {},
  });
  const onSubmit = handleSubmit(val => {
    const { search } = val;
    searchByFilter({ search });
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
          placeholder="Search By Email or Name"
          style={{ width: '250px' }}
          innerRef={register}
        />
      </FormGroup>
      <SearchButton />
    </Form>
  );
};

export default FilterUser;
