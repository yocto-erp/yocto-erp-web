import React, { useEffect } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import { useListFilter } from '../../../../components/ListWidget/constants';
import { SURVEY_TYPE_OPTION } from '../constants';
import TypeSelect from '../../../../components/Select/TypeSelect';
import SearchButton from '../../../../components/button/SearchButton';

const Filter = () => {
  const { searchByFilter, filter } = useListFilter();
  const { handleSubmit, register, control, reset } = useForm({
    defaultValues: filter || {},
  });

  useEffect(() => {
    reset(filter);
  }, [filter]);

  const onSubmit = handleSubmit(val => searchByFilter(val));

  return (
    <Form inline onSubmit={onSubmit} noValidate>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="name" className="mr-2">
          Name
        </Label>
        <Input
          type="search"
          name="search"
          className="mr-2"
          style={{ width: '300px' }}
          innerRef={register}
          id="search"
          placeholder="Search Name or Remark"
        />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="type" className="mr-2">
          Type
        </Label>
        <Controller
          name="type"
          defaultValue=""
          options={SURVEY_TYPE_OPTION}
          control={control}
          id="type"
          placeholder="All"
          as={TypeSelect}
        />
        <SearchButton />
      </FormGroup>
    </Form>
  );
};

export default Filter;
