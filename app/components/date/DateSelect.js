import React from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import classNames from 'classnames';
import { formatDateOnly } from '../../libs/utils/date.util';

const DateSelect = ({ onChange, value, onBlur, invalid, placeholder }) => {
  const handleDayChange = selectedDay => {
    if (isFunction(onChange)) {
      onChange(selectedDay);
    }
  };

  const classes = {
    container: classNames('DayPickerInput', { 'is-invalid': invalid }),
    overlayWrapper: 'DayPickerInput-OverlayWrapper',
    overlay: 'DayPickerInput-Overlay',
  };
  const formatDate = formatDateOnly;
  return (
    <DayPickerInput
      onDayChange={handleDayChange}
      value={value}
      classNames={classes}
      inputProps={{ className: 'form-control' }}
      formatDate={formatDate}
      placeholder={placeholder || 'DD/MM/YYYY'}
    />
  );
};

DateSelect.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.func,
  onBlur: PropTypes.func,
  invalid: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default DateSelect;
