import React from 'react';
import PropTypes from 'prop-types';
import IMask from 'imask';

const Price = ({ amount = 0, currency = 'VND', ...props }) => {
  const numberPipe = IMask.createPipe(
    {
      mask: Number,
      scale: 0,
      thousandsSeparator: '.',
      normalizeZeros: false,
      padFractionalZeros: false,
    },
    IMask.PIPE_TYPE.TYPED,
  );
  return (
    <span {...props}>
      {numberPipe(amount)} <strong>{currency}</strong>
    </span>
  );
};

Price.propTypes = {
  amount: PropTypes.number,
  currency: PropTypes.string,
};

export default Price;
