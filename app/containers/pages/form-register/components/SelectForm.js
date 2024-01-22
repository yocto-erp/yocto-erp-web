import React from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import debounce from "lodash/debounce";
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from "../../../../components/constants";
import studentClassApi from "../../../../libs/apis/student/student-class.api";
import Price from "../../../../components/common/Price";
import registerFormApi from "../../../../libs/apis/form/register-form.api";

const formatOptionLabel = (data, isShowPrice) => (
  <div className="text-white">
    <p className="mb-0">{data.name}</p>
    {isShowPrice && (
      <p className="mb-0">
        <Price amount={data.tuitionFeePerMonth} />
      </p>
    )}
  </div>
);

export const SelectForm = React.forwardRef(
  (
    {
      onBlur,
      invalid,
      name,
      placeholder,
      onAdded,
      onChange,
      value,
      disabled,
      isMulti = false,
      isShowPrice = false,
      ...props
    },
    ref,
  ) => {
    const loadOptions = debounce((inputValue, cb) => {
      registerFormApi
        .search({
          page: 1,
          size: 10,
          filter: {
            search: inputValue,
          },
        })
        .then(resp =>
          cb(
            resp.rows.map(t => ({
              id: t.id,
              name: t.name,
            })),
          ),
        );
    }, 300);
    return (
      <AsyncSelect
        ref={ref}
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder={placeholder}
        noOptionsMessage={({ inputValue }) =>
          inputValue
            ? `Not found any Form Register with search "${inputValue}", try to search another`
            : "Input and search Form Register"
        }
        isMulti={isMulti}
        loadOptions={loadOptions}
        defaultOptions
        styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
        isClearable
        onBlur={onBlur}
        isDisabled={disabled}
        onChange={onChange}
        formatOptionLabel={data => formatOptionLabel(data, isShowPrice)}
        getOptionValue={data => data.id}
        name={name}
        value={value}
        {...props}
      />
    );
  },
);

SelectForm.propTypes = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onAdded: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  isShowPrice: PropTypes.bool,
};
