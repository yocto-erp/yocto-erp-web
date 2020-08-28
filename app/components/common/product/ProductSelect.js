import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, InputGroupAddon } from 'reactstrap';
import AsyncSelect from 'react-select/async';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import isFunction from 'lodash/isFunction';
import ProductModalForm from './ProductModalForm';
import productApi from '../../../libs/apis/product.api';
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from '../../constants';

const formatOptionLabel = data => (
  <div className="text-white">
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
  onChanged,
  defaultValue,
  ...props
}) => {
  const [isOpen, open] = useState(false);
  const loadOptions1 = debounce((inputValue, cb) => {
    productApi
      .search({
        page: 1,
        size: 10,
        filter: {
          name: inputValue,
        },
      })
      .then(resp => cb(resp.rows));
  }, 300);
  return (
    <>
      <InputGroup
        className={classNames({ 'is-invalid': invalid })}
        style={props.checkStyle ? { width: '250px' } : {}}
      >
        <Controller
          defaultValue={defaultValue}
          control={control}
          name={name}
          {...props}
          render={({ onChange: _onChange, onBlur, value, name: _name }) => (
            <AsyncSelect
              aria-labelledby="test"
              className="react-select-container"
              classNamePrefix="react-select"
              cacheOptions
              placeholder={placeholder}
              loadOptions={loadOptions1}
              defaultOptions
              styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
              isClearable
              onBlur={onBlur}
              onChange={val => {
                console.log(`OnChange: ${JSON.stringify(val)}`);
                if (isFunction(onChanged)) {
                  onChanged(val);
                }
                _onChange(val);
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
  defaultValue: PropTypes.any,
  control: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onAdded: PropTypes.func,
  checkStyle: PropTypes.bool,
  onChanged: PropTypes.func,
};

export default ProductSelect;
