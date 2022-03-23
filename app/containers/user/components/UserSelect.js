import React from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import classNames from "classnames";
import debounce from "lodash/debounce";
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from "../../../components/constants";
import userApi from "../../../libs/apis/user.api";

const formatOptionLabel = data => (
  <div className="text-white">
    <span>
      {data?.displayName}&nbsp;({data?.email})
    </span>
  </div>
);

const UserSelect = React.forwardRef((
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
    isMulti = true,
    disabled = false,
    isClearable = false,
    ...props
  },
  // eslint-disable-next-line no-unused-vars
  ref,
) => {
  const loadOptions1 = debounce((inputValue, cb) => {
    userApi
      .search({
        page: 1,
        size: 10,
        filter: {
          search: inputValue,
        },
      })
      .then(resp => cb(resp.rows.map(t => t.user)));
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
            ? `Not found any user with search "${inputValue}", try to search another`
            : "Input and search user"
        }
        loadOptions={loadOptions1}
        defaultOptions
        styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
        isMulti={isMulti}
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

UserSelect.propTypes = {
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
  isMulti: PropTypes.bool,
};

export default UserSelect;
