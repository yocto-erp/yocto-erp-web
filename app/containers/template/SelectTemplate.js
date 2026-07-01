import React from "react"
import PropTypes from "prop-types"
import AsyncSelect from "react-select/async"
import debounce from "lodash/debounce"
import clsx from "clsx"
import { templateApi } from "../../libs/apis/template/template.api"
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from "../../components/constants"

export const SelectTemplate = React.forwardRef(
  ({ onBlur, invalid, name, placeholder, value, onChange, disabled, typeId, ...props }, ref) => {
    const loadOptions = debounce((inputValue, cb) => {
      templateApi
        .search({
          page: 1,
          size: 10,
          filter: {
            search: inputValue,
            typeId,
          },
        })
        .then((resp) => {
          console.log("SelectTemplate:", resp.rows)
          cb(resp.rows)
        })
    }, 300)

    return (
      <div key={`${name}-${typeId || ""}`} className={clsx({ "is-invalid": invalid })}>
        <AsyncSelect
          ref={ref}
          className={clsx("react-select-container")}
          classNamePrefix="react-select"
          placeholder={placeholder}
          noOptionsMessage={({ inputValue }) =>
            inputValue
              ? `Not found any template with search "${inputValue}", try to search another`
              : "Input and search template"
          }
          menuPosition="fixed"
          loadOptions={loadOptions}
          defaultOptions
          styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
          isClearable
          onBlur={onBlur}
          isDisabled={disabled}
          onChange={onChange}
          formatOptionLabel={(data) => data.name}
          getOptionValue={(data) => data.id}
          name={name}
          value={value}
          {...props}
        />
      </div>
    )
  },
)

SelectTemplate.propTypes = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  typeId: PropTypes.number,
}
