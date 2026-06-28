import React from "react"
import PropTypes from "prop-types"
import AsyncSelect from "react-select/async"
import debounce from "lodash/debounce"
import studentApi from "../../../libs/apis/student/student.api"
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from "../../../components/constants"

const formatOptionLabel = (data) => (
  <div className="text-white">
    <span>
      {data.child.name}
      {data.alias ? (
        <>
          {" "}
          (<strong>{data.alias}</strong>)
        </>
      ) : null}{" "}
    </span>
  </div>
)

const StudentSelect = React.forwardRef((
  {
    onBlur,
    name,
    placeholder,
    onFocus,
    onChange,
    value,
    disabled = false,
    isClearable = false,
    studentClass,
  },
  // eslint-disable-next-line no-unused-vars
  ref,
) => {
  const loadOptions1 = debounce((inputValue, cb) => {
    studentApi
      .search({
        page: 1,
        size: 10,
        filter: {
          search: inputValue,
          class: studentClass,
        },
      })
      .then((resp) => cb(resp.rows))
  }, 300)
  return (
    <div key={`${name}-${studentClass?.id || ""}`}>
      <AsyncSelect
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder={placeholder}
        noOptionsMessage={({ inputValue }) =>
          inputValue
            ? `Not found any student with search "${inputValue}", try to search another`
            : "Type & search student"
        }
        loadOptions={loadOptions1}
        styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
        isDisabled={disabled}
        defaultOptions
        menuPortalTarget={document.body}
        isClearable={isClearable}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        formatOptionLabel={formatOptionLabel}
        getOptionValue={(data) => data.id}
        name={name}
        innerRef={ref}
        value={value}
      />
    </div>
  )
})

StudentSelect.propTypes = {
  value: PropTypes.any,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  studentClass: PropTypes.object,
}

export default StudentSelect
