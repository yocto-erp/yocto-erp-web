import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, InputGroupAddon } from 'reactstrap';
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
  ...props
}) => {
  const [isOpen, open] = useState(false);
  const [options, setOptions] = useState([]);
  const request = React.useRef(0);
  useEffect(() => {
    request.current += 1;
    let currentRequest = request.current;
    if (props.productId) {
      productApi.read(props.productId).then(data => {
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
  }, [props.productId]);

  return (
    <>
      <InputGroup className={classNames({ 'is-invalid': invalid })}>
        <Select
          aria-labelledby="test"
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder={placeholder}
          options={options}
          styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
          isClearable
          onBlur={onBlur}
          onChange={onChange}
          getOptionValue={data => data.id}
          formatOptionLabel={formatOptionLabel}
          name={name}
          value={value}
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
