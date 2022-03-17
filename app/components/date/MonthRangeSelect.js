import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import isFunction from "lodash/isFunction";
import DatePicker from "react-datepicker";
import classNames from "classnames";
import {
  FNS_MONTH_FORMAT,
  monthToLocalDateObj,
  toMonthObj,
} from "../../libs/utils/date.util";

const MonthRangeSelect = React.forwardRef(
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
    const [startMonth, setStartMonth] = useState(null);
    const [endMonth, setEndMonth] = useState(null);

    useEffect(() => {
      let month = null;
      let newEndMonth = null;
      console.log(value);
      if (value && (value.from || value.to)) {
        const { from, to } = value;
        try {
          month = monthToLocalDateObj(from.month, from.year);
        } catch (e) {
          console.error(e);
        }

        try {
          newEndMonth = monthToLocalDateObj(to.month, to.year);
        } catch (e) {
          console.error(e);
        }
      }
      if (
        (month !== null &&
          startMonth !== null &&
          month.getTime() !== startMonth.getTime()) ||
        (month !== null && startMonth == null) ||
        (month == null && startMonth !== null)
      ) {
        setStartMonth(month);
      }
      if (
        (newEndMonth !== null &&
          endMonth !== null &&
          newEndMonth.getTime() !== endMonth.getTime()) ||
        (newEndMonth !== null && endMonth == null) ||
        (newEndMonth == null && endMonth !== null)
      ) {
        setEndMonth(newEndMonth);
      }
    }, [value]);

    const onFromMonthChange = useCallback(
      newFromMonth => {
        let newValue = null;
        if (newFromMonth) {
          newValue = { from: null, to: null };
          if (newFromMonth) {
            newValue.from = toMonthObj(newFromMonth);
          }
          if (endMonth) {
            newValue.to = toMonthObj(endMonth);
          }
          if (newValue.from && newValue.to) {
            newValue.numberOfMonths =
              newValue.to.absolute - newValue.from.absolute + 1;
          } else if (newValue.from) {
            newValue.numberOfMonths = 1;
          }
        }
        onChange(newValue);
        setStartMonth(newFromMonth);
        if (newFromMonth == null) {
          setEndMonth(null);
        }
      },
      [endMonth, onChange],
    );

    const onToMonthChange = useCallback(
      newToMonth => {
        let newValue = null;
        if (newToMonth || startMonth) {
          newValue = { from: null, to: null };
          if (startMonth) {
            newValue.from = toMonthObj(startMonth);
          }
          if (newToMonth) {
            newValue.to = toMonthObj(newToMonth);
          }
          if (newValue.from && newValue.to) {
            newValue.numberOfMonths =
              newValue.to.absolute - newValue.from.absolute + 1;
          } else if (newValue.from) {
            newValue.numberOfMonths = 1;
          }
        }
        onChange(newValue);
        setEndMonth(newToMonth);
      },
      [startMonth, onChange],
    );

    const handleOnBlur = ({ target: { val } }) => {
      console.log(val);

      if (isFunction(onBlur)) {
        onBlur();
      }
    };

    return (
      <div className="d-flex align-items-center">
        <div className="flex-fill">
          <DatePicker
            className={classNames("form-control", className, {
              "is-invalid": !!invalid,
            })}
            onBlur={handleOnBlur}
            selected={startMonth}
            onChange={onFromMonthChange}
            isClearable={isClearable}
            disabled={disabled}
            {...props}
            showMonthYearPicker
            placeholderText="From Month"
            dateFormat={FNS_MONTH_FORMAT}
            selectsStart
            startDate={startMonth}
            endDate={endMonth}
            maxDate={endMonth}
          />
        </div>
        <div className="mr-2 ml-2">-</div>
        <div className="flex-fill">
          <DatePicker
            className={classNames("form-control", className, {
              "is-invalid": !!invalid,
            })}
            onBlur={handleOnBlur}
            selected={endMonth}
            onChange={onToMonthChange}
            isClearable={isClearable}
            disabled={!startMonth || disabled}
            {...props}
            showMonthYearPicker
            placeholderText="To Month"
            dateFormat={FNS_MONTH_FORMAT}
            selectsEnd
            minDate={startMonth}
            startDate={startMonth}
            endDate={endMonth}
          />
        </div>
      </div>
    );
  },
);

MonthRangeSelect.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
  invalid: PropTypes.bool,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isClearable: PropTypes.bool,
};

export default MonthRangeSelect;
