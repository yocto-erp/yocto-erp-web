import React from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import debounce from "lodash/debounce";
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from "../../../../components/constants";
import studentClassApi from "../../../../libs/apis/student/student-class.api";
import Price from "../../../../components/common/Price";

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

export const SelectClass = React.forwardRef(
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
      studentClassApi
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
              tuitionFeePerMonth: t.tuitionFeePerMonth,
            })),
          ),
        );
    }, 300);
    return (
      <AsyncSelect
        ref={ref}
        aria-labelledby="test"
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder={placeholder}
        noOptionsMessage={({ inputValue }) =>
          inputValue
            ? `Not found any Class with search "${inputValue}", try to search another`
            : "Input and search Class"
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

SelectClass.propTypes = {
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
