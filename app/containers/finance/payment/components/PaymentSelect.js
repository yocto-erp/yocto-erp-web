import React from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import debounce from "lodash/debounce";
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from "../../../../components/constants";
import { PaymentApi } from "../../../../libs/apis/finance/payment.api";

const formatOptionLabel = data => (
  <div className="text-white">
    <span>{data.name}</span>
  </div>
);

const PaymentSelect = React.forwardRef((
  { onBlur, invalid, name, placeholder, onChange, value, disabled, ...props },
  // eslint-disable-next-line no-unused-vars
  ref,
) => {
  const loadOptions = debounce((inputValue, cb) => {
    PaymentApi.search({
      page: 1,
      size: 100,
      filter: {
        search: inputValue,
      },
    }).then(resp => cb(resp));
  }, 300);
  return (
    <AsyncSelect
      aria-labelledby="test"
      className="react-select-container"
      classNamePrefix="react-select"
      placeholder={placeholder}
      noOptionsMessage={({ inputValue }) =>
        inputValue
          ? `Not found any Payment with search "${inputValue}", try to search another`
          : "Input and search Payment"
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

PaymentSelect.propTypes = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
};

export default PaymentSelect;
