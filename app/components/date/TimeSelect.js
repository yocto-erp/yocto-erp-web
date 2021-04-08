import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import {
  FNS_TIME_FORMAT,
  timeStringToDay,
  dayToTimeString,
} from '../../libs/utils/date.util';

const TimeSelect = React.forwardRef(
  ({
    onChange,
    value,
    invalid,
    onBlur,
    placeholder,
    disabled,
    className,
    isClearable = false,
    ...props
  }) => {
    const [timeValue, setTimeValue] = useState(null);

    useEffect(() => {
      let time = null;
      console.log(value);
      if (value) {
        try {
          time = timeStringToDay(value);
        } catch (e) {
          console.error(e);
        }
      }
      if (time !== timeValue) {
        setTimeValue(time);
      }
    }, [value]);

    const handleDayChange = selectedTime => {
      console.log(selectedTime);
      if (isFunction(onChange)) {
        onChange(dayToTimeString(selectedTime));
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
        {...props}
        onBlur={handleOnBlur}
        selected={timeValue}
        onChange={handleDayChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={10}
        dropdownMode="select"
        placeholderText={placeholder}
        dateFormat={FNS_TIME_FORMAT}
      />
    );
  },
);
TimeSelect.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  invalid: PropTypes.bool,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
};

export default TimeSelect;
