import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IMaskInput } from 'react-imask';
import isFunction from 'lodash/isFunction';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

const InputPercent = ({ invalid, value, onChange, placeholder, ...props }) => (
  <InputGroup className={classNames({ 'is-invalid': invalid })}>
    <IMaskInput
      className={classNames('form-control', { 'is-invalid': invalid })}
      {...props}
      mask={Number}
      radix=","
      scale={2}
      signed={false}
      thousandsSeparator="."
      value={value}
      onChange={onChange}
      unmask="typed" // true|false|'typed'
      onAccept={_val => isFunction(onChange) && onChange(_val)}
      placeholder={placeholder}
    />
    <InputGroupAddon addonType="prepend">
      <InputGroupText className="text-white">%</InputGroupText>
    </InputGroupAddon>
  </InputGroup>
);

InputPercent.propTypes = {
  invalid: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default InputPercent;
