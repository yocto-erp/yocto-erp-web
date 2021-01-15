import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IMaskInput } from 'react-imask';
import { isFunc } from '../../utils/util';

const InputNumber = React.forwardRef(
  // eslint-disable-next-line no-unused-vars
  (
    {
      invalid,
      value,
      onChange,
      placeholder,
      max,
      min,
      readOnly = false,
      ...props
    },
    ref,
  ) => (
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
      max={max}
      min={min}
      readOnly={readOnly}
      onAccept={_val => {
        if (isFunc(onChange)) {
          onChange(_val);
        }
      }}
      placeholder={placeholder}
    />
  ),
);

InputNumber.propTypes = {
  invalid: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  readOnly: PropTypes.bool,
};

export default InputNumber;
