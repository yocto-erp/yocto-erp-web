import React from 'react';
import PropTypes from 'prop-types';
import { numberPipe, roundUp } from '../../libs/utils/number.util';

const Price = ({ amount = 0, currency = 'VND', scale = 0, ...props }) => {
  const numberPipeFn = numberPipe(scale);

  if (Number.isNaN(amount)) return '';
  return (
    <span {...props}>
      {numberPipeFn(roundUp(amount, scale))} <strong>{currency}</strong>
    </span>
  );
};

Price.propTypes = {
  amount: PropTypes.number,
  currency: PropTypes.string,
  scale: PropTypes.number,
};

export default Price;
