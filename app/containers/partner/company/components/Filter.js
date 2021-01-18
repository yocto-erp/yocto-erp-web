import React, { useEffect } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useListFilter } from '../../../../components/ListWidget/constants';
import SearchButton from '../../../../components/button/SearchButton';

const Filter = () => {
  const { searchByFilter, filter } = useListFilter();
  const { handleSubmit, register, reset } = useForm({
    defaultValues: filter || {},
  });

  const onSubmit = handleSubmit(val => searchByFilter(val));

  useEffect(() => {
    reset(filter);
  }, [filter]);

  return (
    <Form inline onSubmit={onSubmit} noValidate>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="name" className="mr-sm-2">
          Name
        </Label>
        <Input
          type="search"
          name="search"
          className="mr-2"
          style={{ width: '300px' }}
          innerRef={register}
          id="search"
          placeholder="Search By Company Name"
        />
        <SearchButton />
      </FormGroup>
    </Form>
  );
};

export default Filter;
