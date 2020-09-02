import React from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { useListFilter } from '../../../../components/ListWidget/constants';
import SearchButton from '../../../../components/button/SearchButton';
import CompanySelect from '../../../../components/common/company/CompanySelect';
import CustomerSelect from '../../../../components/common/customer/CustomerSelect';

const Filter = ({ data }) => {
  const { handleSubmit, register, control } = useForm({
    defaultValues: data,
  });
  const setFilter = useListFilter();
  const onSubmit = handleSubmit(val => {
    const partnerCompanyId = val.company ? val.company.id : null;
    const partnerPersonId = val.customer ? val.customer.id : null;
    const { search } = val;
    setFilter({ search, partnerCompanyId, partnerPersonId });
  });
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
          placeholder="Search By Name"
        />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="partnerCompanyId" className="mr-sm-2">
          Company
        </Label>
        <Controller
          name="company"
          defaultValue={null}
          creatable={false}
          style={{ width: '250px' }}
          control={control}
          id="partnerCompanyId"
          placeholder="Company Name"
          as={CompanySelect}
        />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="partnerCustomerId" className="mr-sm-2">
          Customer
        </Label>
        <Controller
          name="customer"
          defaultValue={null}
          creatable={false}
          style={{ width: '250px' }}
          control={control}
          id="partnerPersonId"
          placeholder="Customer Name"
          as={CustomerSelect}
        />
      </FormGroup>
      <SearchButton />
    </Form>
  );
};

Filter.propTypes = {
  data: PropTypes.object,
};

export default Filter;
