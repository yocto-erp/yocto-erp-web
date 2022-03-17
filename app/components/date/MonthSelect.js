import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import isFunction from "lodash/isFunction";
import DatePicker from "react-datepicker";
import classNames from "classnames";
import {
  FNS_MONTH_FORMAT,
  monthToLocalDateObj,
  toMonthObj,
} from "../../libs/utils/date.util";

const MonthSelect = React.forwardRef(
  // eslint-disable-next-line no-unused-vars
  (
    {
      onChange,
      value,
      invalid,
      onBlur,
      placeholder,
      disabled,
      className,
      isClearable = false,
      ...props
    },
    // eslint-disable-next-line no-unused-vars
    ref,
  ) => {
    const [monthValue, setMonthValue] = useState(null);

    useEffect(() => {
      let month = null;
      console.log(value);
      if (value) {
        try {
          month = monthToLocalDateObj(value.month, value.year);
        } catch (e) {
          console.error(e);
        }
      }
      if (month !== monthValue) {
        setMonthValue(month);
        onChange(value);
      }
    }, [value]);

    const handleDayChange = selectedDay => {
      console.log(selectedDay);
      if (isFunction(onChange)) {
        onChange(toMonthObj(selectedDay));
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
        className={classNames("form-control", className, {
          "is-invalid": !!invalid,
        })}
        onBlur={handleOnBlur}
        selected={monthValue}
        onChange={handleDayChange}
        isClearable={isClearable}
        disabled={disabled}
        {...props}
        showMonthYearPicker
        placeholderText={placeholder}
        dateFormat={FNS_MONTH_FORMAT}
      />
    );
  },
);

MonthSelect.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
  invalid: PropTypes.bool,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isClearable: PropTypes.bool,
};

export default MonthSelect;
