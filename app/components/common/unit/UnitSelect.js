import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, CustomInput, InputGroup, InputGroupAddon } from 'reactstrap';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import Select from 'react-select';
import productApi from '../../../libs/apis/product/product.api';
import UnitModalForm from './UnitModalForm';
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from '../../constants';

const formatOptionLabel = data =>
  data ? (
    <div className="">
      <span>
        {data.name} - {data.rate}
      </span>
    </div>
  ) : (
    ''
  );

const UnitSelect = ({
  onChange,
  value,
  onBlur,
  invalid,
  name,
  placeholder,
  onAdded,
  productId,
  ...props
}) => {
  const [isOpen, open] = useState(false);
  const [options, setOptions] = useState([]);
  const request = React.useRef(0);
  useEffect(() => {
    request.current += 1;
    let currentRequest = request.current;
    if (productId) {
      productApi.read(productId).then(data => {
        if (currentRequest === request.current) {
          setOptions(data.units);
        }
      });
    } else {
      setOptions([]);
    }
    return () => {
      currentRequest = 0;
    };
  }, [productId]);

  const onChangeHandle = React.useCallback(
    event => {
      console.log(event.target.value);
      const id = Number(event.target.value);
      if (id > 0) {
        onChange(options.find(t => t.id === id));
      } else {
        onChange(null);
      }
    },
    [onChange, options],
  );

  return (
    <>
      <InputGroup className={classNames({ 'is-invalid': invalid })}>
        <CustomInput
          type="select"
          onChange={onChangeHandle}
          onBlur={onBlur}
          disabled={!productId}
          value={value ? value.id : '0'}
        >
          <option value="0">{placeholder}</option>
          {options.map(t => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </CustomInput>
        <InputGroupAddon addonType="append">
          <Button
            color="primary"
            type="button"
            disabled={!productId}
            onClick={() => open(true)}
          >
            <i className="las la-plus" />
          </Button>
        </InputGroupAddon>
      </InputGroup>
      {productId ? (
        <UnitModalForm
          closeHandle={val => {
            if (val && onAdded) {
              onAdded(val);
            }
            open(false);
          }}
          isOpen={isOpen}
          productId={productId}
        />
      ) : (
        ''
      )}
    </>
  );
};
UnitSelect.propTypes = {
  invalid: PropTypes.bool,
  productId: PropTypes.any,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onAdded: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.any,
};

export default UnitSelect;
