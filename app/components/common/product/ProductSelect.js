import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, InputGroupAddon } from 'reactstrap';
import AsyncSelect from 'react-select/async';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import ProductModalForm from './ProductModalForm';
import productApi from '../../../libs/apis/product.api';

const loadOptions1 = inputValue =>
  productApi
    .search({
      page: 1,
      size: 10,
      filter: {
        search: inputValue,
      },
    })
    .then(resp => resp.rows);

const customStyles = {
  option: (provided, state) => {
    let color = '#1870DC';
    let background = 'transparent';
    if (state.isDisabled) {
      color = '#798892';
    } else if (state.isFocused || state.isSelected) {
      color = 'white';
      background = '#1870DC';
    }
    return {
      ...provided,
      color,
      backgroundColor: background,
    };
  },
};

const formatOptionLabel = data => (
  <div className="text-info">
    <span>
      {data.name} - {data.remark}
    </span>
  </div>
);

const ProductSelect = ({
  control,
  invalid,
  name,
  placeholder,
  onAdded,
  ...props
}) => {
  const [isOpen, open] = useState(false);

  return (
    <>
      <InputGroup className={classNames({ 'is-invalid': invalid })}>
        <Controller
          defaultValue=""
          control={control}
          name={name}
          {...props}
          render={({ onChange, onBlur, value, name: _name }) => (
            <AsyncSelect
              aria-labelledby="test"
              className="react-select-container"
              classNamePrefix="react-select"
              cacheOptions
              placeholder={placeholder}
              loadOptions={loadOptions1}
              defaultOptions
              styles={customStyles}
              isClearable
              onBlur={onBlur}
              onChange={val => {
                console.log(`OnChange: ${JSON.stringify(val)}`);
                onChange(val);
              }}
              formatOptionLabel={formatOptionLabel}
              getOptionValue={data => data.id}
              name={_name}
              value={value}
            />
          )}
        />

        <InputGroupAddon addonType="append">
          <Button color="primary" type="button" onClick={() => open(true)}>
            <i className="las la-plus" />
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <ProductModalForm
        closeHandle={val => {
          console.log(val);
          if (val && onAdded) {
            onAdded(val);
          }
          open(false);
        }}
        isOpen={isOpen}
      />
    </>
  );
};
ProductSelect.propTypes = {
  control: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onAdded: PropTypes.func,
};

export default ProductSelect;
