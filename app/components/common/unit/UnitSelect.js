import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, InputGroupAddon } from 'reactstrap';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import Select from 'react-select';
import productApi from '../../../libs/apis/product.api';
import UnitModalForm from './UnitModalForm';

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
      {data.name} - {data.rate}
    </span>
  </div>
);

const UnitSelect = ({
  control,
  invalid,
  name,
  placeholder,
  onAdded,
  ...props
}) => {
  const [isOpen, open] = useState(false);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (props.productId) {
      productApi.read(props.productId).then(data => {
        setOptions(data.units);
      });
    }
  }, [props.productId]);

  return (
    <>
      <InputGroup className={classNames({ 'is-invalid': invalid })}>
        <Controller
          defaultValue=""
          control={control}
          name={name}
          {...props}
          render={({ onChange, onBlur, value, name: _name }) => (
            <Select
              aria-labelledby="test"
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder={placeholder}
              options={options}
              styles={customStyles}
              isClearable
              onBlur={onBlur}
              onChange={val => {
                console.log(`OnChange: ${JSON.stringify(val)}`);
                onChange(val);
              }}
              formatOptionLabel={formatOptionLabel}
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
      <UnitModalForm
        closeHandle={val => {
          console.log(val);
          if (val && onAdded) {
            onAdded(val);
          }
          open(false);
        }}
        isOpen={isOpen}
        productId={props.productId}
      />
    </>
  );
};
UnitSelect.propTypes = {
  control: PropTypes.any,
  invalid: PropTypes.bool,
  productId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onAdded: PropTypes.func,
};

export default UnitSelect;
