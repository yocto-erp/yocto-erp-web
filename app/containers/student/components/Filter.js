import React, { useEffect } from 'react';
import { Button, Form, Input } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useListFilter } from '../../../components/ListWidget/constants';
import SearchButton from '../../../components/button/SearchButton';
import useStudentConfigure from '../../../libs/hooks/useStudentConfigure';

const Filter = () => {
  const { searchByFilter, filter } = useListFilter();
  console.log(filter);
  const { handleSubmit, register, reset } = useForm({
    defaultValues: filter || {},
  });

  useEffect(() => {
    reset(filter || {});
  }, [filter]);
  const { configure } = useStudentConfigure();
  const onSubmit = handleSubmit(val => searchByFilter(val));

  return (
    <Form inline onSubmit={onSubmit} noValidate>
      <Input
        type="search"
        name="search"
        className="mr-2 mt-2"
        style={{ width: '300px' }}
        innerRef={register}
        id="search"
        placeholder="Search By student Name"
      />
      <Input
        type="select"
        name="class"
        className="mr-2 mt-2"
        innerRef={register}
        id="class"
      >
        <option value="">ALL Classes</option>
        {configure?.classes?.map(t => (
          <option value={t.id} key={t.id}>
            {t.name}
          </option>
        ))}
      </Input>
      <SearchButton className="ml-2 mt-2" />
      <Button
        color="danger"
        className="ml-2 mt-2"
        onClick={() => {
          reset({});
          searchByFilter({});
        }}
        type="button"
      >
        Reset
      </Button>
    </Form>
  );
};

export default Filter;
