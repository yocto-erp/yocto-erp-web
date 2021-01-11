import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../../libs/utils/date.util';

const DateView = ({ date }) => {
  let rs = '';
  try {
    rs = formatDate(new Date(date));
  } catch (e) {}
  return rs;
};

DateView.propTypes = {
  date: PropTypes.string,
};

export default DateView;
