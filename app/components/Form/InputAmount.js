import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IMaskInput } from 'react-imask';
import isFunction from 'lodash/isFunction';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { roundUp } from '../../libs/utils/number.util';

const InputAmount = React.forwardRef((
  { invalid, value, onChange, placeholder, scale = 0, currency = 'VND' },
  // eslint-disable-next-line no-unused-vars
  ref,
) => (
  <InputGroup className={classNames({ 'is-invalid': invalid })}>
    <IMaskInput
      className="form-control"
      mask={Number}
      radix=","
      scale={scale}
      signed={false}
      thousandsSeparator="."
      mapToRadix={['.']}
      value={roundUp(value, scale)}
      unmask="typed" // true|false|'typed'
      onAccept={_val => isFunction(onChange) && onChange(_val)}
      placeholder={placeholder}
    />
    <InputGroupAddon addonType="append">
      <InputGroupText className="text-white">{currency}</InputGroupText>
    </InputGroupAddon>
  </InputGroup>
));

InputAmount.propTypes = {
  invalid: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  scale: PropTypes.number,
  currency: PropTypes.string,
};

export default InputAmount;
