import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IMaskInput } from 'react-imask';
import isFunction from 'lodash/isFunction';

const InputAmount = ({ invalid, value, onChange, placeholder }) => (
  <IMaskInput
    className={classNames('form-control', {
      'is-invalid': invalid,
    })}
    mask={Number}
    radix=","
    value={value}
    unmask="typed" // true|false|'typed'
    onAccept={_val => isFunction(onChange) && onChange(_val)}
    placeholder={placeholder}
  />
);

InputAmount.propTypes = {
  invalid: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default InputAmount;
