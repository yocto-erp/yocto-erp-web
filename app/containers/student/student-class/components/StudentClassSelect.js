import React, { useState } from "react"
import AsyncCreatableSelect from "react-select/async-creatable"
import PropTypes from "prop-types"
import debounce from "lodash/debounce"
import studentClassApi from "../../../../libs/apis/student/student-class.api"
import StudentClassItem from "./StudentClassItem"
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from "../../../../components/constants"

const StudentClassSelect = React.forwardRef((
  {
    onBlur,
    invalid,
    name,
    placeholder,
    onAdded,
    onChange,
    value,
    disabled,
    isMultiple,
    isClearable,
    ...props
  },
  // eslint-disable-next-line no-unused-vars
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
      .then(resp => cb(resp.rows));
  }, 300)
  console.log("value", value);
  return (
    <AsyncCreatableSelect
      isDisabled={disabled}
      isMulti={isMultiple}
      noOptionsMessage={({ inputValue }) =>
        inputValue
          ? `Not found any Class with search "${inputValue}", try to search another`
          : "Input and search Class"
      }
      className={"react-select-container"}
      classNamePrefix="my-select"
      styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
      menuPortalTarget={document.body}
      placeholder={placeholder}
      value={value}
      onChange={(val) => onChange(val)}
      formatCreateLabel={(val) => `Create Student Class ${val} ...`}
      isSearchable
      isClearable={isClearable}
      {...props}
      name={name}
      loadOptions={loadOptions}
      formatOptionLabel={(t) => <StudentClassItem studentClass={t} />}
      getOptionValue={(e) => e?.class?.id || e.id}
      cacheOptions={false}
      defaultOptions
    />
  )
})

StudentClassSelect.propTypes = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onAdded: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  isMultiple: PropTypes.bool,
  isClearable: PropTypes.bool,
}

export default StudentClassSelect
