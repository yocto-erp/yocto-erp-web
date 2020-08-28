import React from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useListFilter } from '../../../../components/ListWidget/constants';
import SearchButton from '../../../../components/button/SearchButton';
import ProductSelect from '../../../../components/common/product/ProductSelect';
import WarehouseSelect from '../../../../components/common/warehouse/WarehouseSelect';

const FilterInventorySummary = ({ data }) => {
  const { handleSubmit, register, control } = useForm({
    defaultValues: data,
  });
  const setFilter = useListFilter();
  const onSubmit = handleSubmit(val => {
    const productId = val.product ? val.product.id : null;
    const warehouseId = val.warehouse ? val.warehouse.id : null;
    setFilter({ warehouseId, productId });
  });

  return (
    <Form inline onSubmit={onSubmit} noValidate>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="productId" className="mr-sm-2">
          Warehouse
        </Label>
        <WarehouseSelect
          name="warehouse"
          control={control}
          id="warehouseId"
          placeholder="Warehouse Name"
          checkStyle
        />
      </FormGroup>

      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="productId" className="mr-sm-2">
          Product
        </Label>
        <ProductSelect
          name="product"
          control={control}
          id="productId"
          placeholder="Product Name"
          checkStyle
          innerRef={register}
          onAdded={newProduct => {
            console.log(`Added Product ${JSON.stringify(newProduct)}`);
          }}
        />
      </FormGroup>

      <SearchButton />
    </Form>
  );
};

FilterInventorySummary.propTypes = {
  data: PropTypes.object,
};

export default FilterInventorySummary;
