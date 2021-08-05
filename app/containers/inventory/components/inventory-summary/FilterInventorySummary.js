import React from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import { useListFilter } from '../../../../components/ListWidget/constants';
import SearchButton from '../../../../components/button/SearchButton';
import ProductSelect from '../../../../components/common/product/ProductSelect';
import WarehouseSelect from '../../../../components/common/warehouse/WarehouseSelect';

const FilterInventorySummary = () => {
  const { searchByFilter, filter } = useListFilter();
  const { handleSubmit, control } = useForm({
    defaultValues: filter || {},
  });

  const onSubmit = handleSubmit(val => {
    const productId = val.product ? val.product.id : null;
    const warehouseId = val.warehouse ? val.warehouse.id : null;
    searchByFilter({ warehouseId, productId });
  });

  return (
    <Form inline onSubmit={onSubmit} noValidate>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="warehouseId" className="mr-sm-2">
          Warehouse
        </Label>
        <div style={{ width: '250px' }}>
          <Controller
            defaultValue={null}
            name="warehouse"
            control={control}
            id="warehouseId"
            placeholder="Select Warehouse"
            as={WarehouseSelect}
          />
        </div>
      </FormGroup>

      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="productId" className="mr-sm-2">
          Product
        </Label>
        <Controller
          name="product"
          defaultValue={null}
          creatable={false}
          style={{ width: '250px' }}
          control={control}
          id="productId"
          placeholder="Product Name"
          as={ProductSelect}
        />
      </FormGroup>

      <SearchButton />
    </Form>
  );
};

export default FilterInventorySummary;
