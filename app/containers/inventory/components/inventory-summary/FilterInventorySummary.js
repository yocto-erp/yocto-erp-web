import React from "react";
import { Form } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { useListFilter } from "../../../../components/ListWidget/constants";
import SearchButton from "../../../../components/button/SearchButton";
import ProductSelect from "../../../../components/common/product/ProductSelect";
import WarehouseSelect from "../../../../components/common/warehouse/WarehouseSelect";

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
      <Controller
        defaultValue={null}
        name="warehouse"
        control={control}
        render={({ onChange, value }, { invalid }) => (
          <WarehouseSelect
            className="mr-2 mt-md-0 mt-2"
            id="warehouseId"
            placeholder="Select Warehouse"
            onChange={onChange}
            value={value}
            invalid={invalid}
          />
        )}
      />

      <div style={{ width: "300px" }} className="mr-2 mt-md-0 mt-2">
        <Controller
          name="product"
          defaultValue={null}
          control={control}
          render={({ onChange, value }, { invalid }) => (
            <ProductSelect
              name="product"
              creatable={false}
              id="productId"
              placeholder="Search and Select Product"
              onChange={onChange}
              value={value}
              invalid={invalid}
            />
          )}
        />
      </div>
      <SearchButton className="mr-2 mt-md-0 mt-2" />
    </Form>
  );
};

export default FilterInventorySummary;
