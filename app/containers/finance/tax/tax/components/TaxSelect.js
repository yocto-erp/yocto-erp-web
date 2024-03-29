import React from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import classNames from "classnames";
import debounce from "lodash/debounce";
import taxApi from "../../../../../libs/apis/tax/tax.api";
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from "../../../../../components/constants";

const formatOptionLabel = data => (
  <div className="text-white">
    <span>{data.name}</span>
  </div>
);

const TaxSelect = React.forwardRef((
  {
    onBlur,
    invalid,
    name,
    placeholder,
    onAdded,
    onChange,
    value,
    isMulti = true,
    disabled = false,
    isClearable = false,
    ...props
  },
  // eslint-disable-next-line no-unused-vars
  ref,
) => {
  const loadOptions = debounce((inputValue, cb) => {
    taxApi
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
    <div
      className={classNames({ "is-invalid": invalid })}
      {...props}
      key={`${name}`}
    >
      <AsyncSelect
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder={placeholder}
        loadOptions={loadOptions}
        defaultOptions
        styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
        noOptionsMessage={({ inputValue }) =>
          inputValue
            ? `Not found any Tax with search "${inputValue}", try to search another`
            : "Input and search Tax"
        }
        onBlur={onBlur}
        onChange={onChange}
        formatOptionLabel={formatOptionLabel}
        getOptionValue={data => data.id}
        name={name}
        value={value}
        isMulti={isMulti}
        isDisabled={disabled}
        isClearable={isClearable}
      />
    </div>
  );
});

TaxSelect.propTypes = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onAdded: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool,
};

export default TaxSelect;
