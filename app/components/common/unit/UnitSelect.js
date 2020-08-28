import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, InputGroupAddon } from 'reactstrap';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import Select from 'react-select';
import productApi from '../../../libs/apis/product.api';
import UnitModalForm from './UnitModalForm';
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from '../../constants';

const formatOptionLabel = data =>
  data ? (
    <div className="text-info">
      <span>
        {data.name} - {data.rate}
      </span>
    </div>
  ) : (
    ''
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
  const request = React.useRef(0);
  useEffect(() => {
    request.current += 1;
    let currentRequest = request.current;
    console.log(`Unit Product Id: ${props.productId}`);
    if (props.productId) {
      productApi.read(props.productId).then(data => {
        if (currentRequest === request.current) {
          setOptions(data.units);
        }
      });
    } else {
      setOptions(null);
    }
    return () => {
      currentRequest = 0;
    };
  }, [props.productId]);

  return (
    <>
      <InputGroup className={classNames({ 'is-invalid': invalid })}>
        <Controller
          defaultValue={props.defaultValue}
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
      {props.productId ? (
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
      ) : (
        ''
      )}
    </>
  );
};
UnitSelect.propTypes = {
  defaultValue: PropTypes.any,
  control: PropTypes.any,
  invalid: PropTypes.bool,
  productId: PropTypes.any,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onAdded: PropTypes.func,
};

export default UnitSelect;
