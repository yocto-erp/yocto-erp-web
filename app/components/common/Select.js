import React from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from "../constants";
import { defaultFormatOptionLabel } from "../Form/constants";

const Select = React.forwardRef(
  (
    {
      onBlur,
      name,
      placeholder,
      onFocus,
      onChange,
      value,
      disabled = false,
      isClearable = true,
      options,
      formatOptionLabel = defaultFormatOptionLabel,
      getOptionValue,
    },
    ref,
  ) => (
    <ReactSelect
      options={options}
      className="react-select-container"
      classNamePrefix="react-select"
      styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
      onChange={onChange}
      formatOptionLabel={formatOptionLabel}
      getOptionValue={getOptionValue}
      isDisabled={disabled}
      isClearable={isClearable}
      name={name}
      placeholder={placeholder}
      onBlur={onBlur}
      onFocus={onFocus}
      innerRef={ref}
      value={value}
    />
  ),
);

Select.propTypes = {
  value: PropTypes.any,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  options: PropTypes.array,
  formatOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
};

export default Select;
