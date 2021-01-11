import React from 'react';
import PropTypes from 'prop-types';
import { numberPipe } from '../../libs/utils/number.util';

const Price = ({ amount = 0, currency = 'VND', ...props }) => {
  const numberPipeFn = numberPipe();
  return (
    <span {...props}>
      {numberPipeFn(amount)} <strong>{currency}</strong>
    </span>
  );
};

Price.propTypes = {
  amount: PropTypes.number,
  currency: PropTypes.string,
};

export default Price;
