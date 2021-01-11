import React from 'react';
import PropTypes from 'prop-types';
import { ago } from '../../../libs/utils/date.util';

const Ago = ({ date }) => {
  let rs = '';
  if (date) {
    rs = ago(new Date(), new Date(date));
  }
  return `${rs} ago`;
};

Ago.propTypes = {
  date: PropTypes.any,
};

export default Ago;
