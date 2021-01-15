import React from 'react';
import PropTypes from 'prop-types';
import { numberPipe } from '../../libs/utils/number.util';

const Price = ({ amount = '', currency = 'VND', ...props }) => {
  const numberPipeFn = numberPipe();
  if (Number.isNaN(amount)) return '';
  return (
    <span {...props}>
      {numberPipeFn(amount)} <strong>{currency}</strong>
    </span>
  );
};

Price.propTypes = {
  amount: PropTypes.any,
  currency: PropTypes.string,
};

export default Price;
