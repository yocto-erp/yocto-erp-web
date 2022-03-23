import React from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import classNames from "classnames";
import debounce from "lodash/debounce";
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from "../../../components/constants";
import shopApi from "../../../libs/apis/shop.api";

const formatOptionLabel = data => (
  <div className="text-white">
    <span>{data.name}</span>
  </div>
);

const ShopSelect = React.forwardRef((
  {
    onBlur,
    invalid,
    id,
    name,
    placeholder,
    onAdded,
    onFocus,
    onChange,
    value,
    disabled = false,
    isClearable = false,
    ...props
  },
  // eslint-disable-next-line no-unused-vars
  ref,
) => {
  const loadOptions1 = debounce((inputValue, cb) => {
    shopApi
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
    <div className={classNames({ "is-invalid": invalid })} {...props}>
      <AsyncSelect
        aria-labelledby="test"
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder={placeholder}
        noOptionsMessage={({ inputValue }) =>
          inputValue
            ? `Not found any shop with search "${inputValue}", try to search another`
            : "Input and search shop"
        }
        loadOptions={loadOptions1}
        defaultOptions
        styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
        isDisabled={disabled}
        isClearable={isClearable}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        formatOptionLabel={formatOptionLabel}
        getOptionValue={data => data.id}
        name={name}
        innerRef={ref}
        value={value}
      />
    </div>
  );
});

ShopSelect.propTypes = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onAdded: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  creatable: PropTypes.bool,
  onFocus: PropTypes.func,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  isClearable: PropTypes.bool,
};

export default ShopSelect;
