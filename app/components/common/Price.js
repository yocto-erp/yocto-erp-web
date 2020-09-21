import React from 'react';
import PropTypes from 'prop-types';
import IMask from 'imask';

const Price = ({ amount, currency = 'VND' }) => {
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
    <span>
      {numberPipe(amount)} {currency}
    </span>
  );
};

Price.propTypes = {
  amount: PropTypes.number,
  currency: PropTypes.string,
};

export default Price;
