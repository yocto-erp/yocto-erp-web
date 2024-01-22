import React from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import debounce from "lodash/debounce";
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from "../../../../components/constants";
import studentBusStopApi from "../../../../libs/apis/student/student-bus-stop.api";

const formatOptionLabel = data => (
  <div className="text-white">
    <span>{data.name}</span>
  </div>
);

const BusStopSelect = React.forwardRef((
  {
    onBlur,
    invalid,
    name,
    placeholder,
    onAdded,
    onChange,
    value,
    disabled,
    ...props
  },
  // eslint-disable-next-line no-unused-vars
  ref,
) => {
  const loadOptions = debounce((inputValue, cb) => {
    studentBusStopApi
      .search({
        page: 1,
        size: 10,
        filter: {
          search: inputValue,
        },
      })
      .then(resp => cb(resp.rows));
  }, 300);
  return (
    <AsyncSelect
      className="react-select-container"
      classNamePrefix="react-select"
      placeholder={placeholder}
      noOptionsMessage={({ inputValue }) =>
        inputValue
          ? `Not found any Bus Stop with search "${inputValue}", try to search another`
          : "Input and search Bus Stop"
      }
      loadOptions={loadOptions}
      defaultOptions
      styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
      isClearable
      onBlur={onBlur}
      isDisabled={disabled}
      onChange={val => onChange(val)}
      formatOptionLabel={formatOptionLabel}
      getOptionValue={data => data.id}
      name={name}
      value={value}
      {...props}
    />
  );
});

BusStopSelect.propTypes = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onAdded: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
};

export default BusStopSelect;
