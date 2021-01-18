import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IMaskInput } from 'react-imask';
import isFunction from 'lodash/isFunction';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

const InputAmount = React.forwardRef(
  // eslint-disable-next-line no-unused-vars
  ({ invalid, value, onChange, placeholder }, ref) => (
    <InputGroup className={classNames({ 'is-invalid': invalid })}>
      <IMaskInput
        className="form-control"
        mask={Number}
        radix=","
        scale={0}
        signed={false}
        thousandsSeparator="."
        value={value}
        unmask="typed" // true|false|'typed'
        onAccept={_val => isFunction(onChange) && onChange(_val)}
        placeholder={placeholder}
      />
      <InputGroupAddon addonType="append">
        <InputGroupText className="text-white">VND</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
);

InputAmount.propTypes = {
  invalid: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default InputAmount;
