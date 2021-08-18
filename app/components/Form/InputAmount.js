import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { IMaskInput } from 'react-imask';
import { isFunc } from '../../utils/util';
import { roundUp } from '../../libs/utils/number.util';

const InputAmount = React.forwardRef((
  {
    invalid,
    value,
    onChange,
    placeholder,
    scale = 0,
    currency = 'VND',
    prepend,
    ...props
  },
  // eslint-disable-next-line no-unused-vars
  ref,
) => (
  <InputGroup className={classNames({ 'is-invalid': invalid })}>
    {prepend}
    <IMaskInput
      className="form-control"
      mask={Number}
      radix=","
      scale={scale}
      signed={false}
      {...props}
      thousandsSeparator="."
      mapToRadix={['.']}
      value={roundUp(value, scale)}
      unmask // true|false|'typed'
      onAccept={_val => isFunc(onChange) && onChange(_val)}
      placeholder={placeholder}
    />
    <InputGroupAddon addonType="append">
      <InputGroupText className="text-white">{currency}</InputGroupText>
    </InputGroupAddon>
  </InputGroup>
));

InputAmount.propTypes = {
  prepend: PropTypes.any,
  invalid: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  scale: PropTypes.number,
  currency: PropTypes.string,
};

export default InputAmount;
