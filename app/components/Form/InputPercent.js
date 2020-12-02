import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IMaskInput } from 'react-imask';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { isFunc } from '../../utils/util';

const InputPercent = React.forwardRef(
  // eslint-disable-next-line no-unused-vars
  ({ invalid, value, onChange, placeholder, ...props }, ref) => (
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
        max={100}
        min={0}
        unmask="typed" // true|false|'typed'
        onAccept={_val => {
          if (isFunc(onChange)) {
            onChange(_val);
          }
        }}
        placeholder={placeholder}
      />
      <InputGroupAddon addonType="append">
        <InputGroupText className="">%</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
);

InputPercent.propTypes = {
  invalid: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default InputPercent;
