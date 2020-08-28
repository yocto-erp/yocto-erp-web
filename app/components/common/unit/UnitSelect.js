import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, InputGroupAddon } from 'reactstrap';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import Select from 'react-select';
import productApi from '../../../libs/apis/product.api';
import UnitModalForm from './UnitModalForm';
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from '../../constants';

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
              styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
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
