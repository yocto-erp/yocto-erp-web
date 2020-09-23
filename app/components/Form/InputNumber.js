import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IMaskInput } from 'react-imask';
import isFunction from 'lodash/isFunction';

const InputNumber = ({ invalid, value, onChange, placeholder, ...props }) => (
  <IMaskInput
    className={classNames('form-control', { 'is-invalid': invalid })}
    {...props}
    mask={Number}
    radix=","
    scale={2}
    signed={false}
    thousandsSeparator="."
    value={value}
    unmask="typed" // true|false|'typed'
    onAccept={_val => isFunction(onChange) && onChange(_val)}
    placeholder={placeholder}
  />
);

InputNumber.propTypes = {
  invalid: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default InputNumber;
