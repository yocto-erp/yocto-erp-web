import React from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import { FNS_MONTH_FORMAT } from '../../libs/utils/date.util';

const MonthSelect = ({ onChange, value, invalid, onBlur, placeholder }) => {
  const handleDayChange = selectedDay => {
    console.log(selectedDay);
    if (isFunction(onChange)) {
      onChange(selectedDay);
    }
  };

  const handleOnBlur = ({ target: { val } }) => {
    console.log(val);

    if (isFunction(onBlur)) {
      onBlur();
    }
  };

  return (
    <DatePicker
      className={classNames('form-control', {
        'is-invalid': !!invalid,
      })}
      onBlur={handleOnBlur}
      selected={value}
      onChange={handleDayChange}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      placeholderText={placeholder}
      dateFormat={FNS_MONTH_FORMAT}
    />
  );
};

MonthSelect.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
  invalid: PropTypes.bool,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
};

export default MonthSelect;
