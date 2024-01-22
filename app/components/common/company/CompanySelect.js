import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, InputGroup, InputGroupAddon } from "reactstrap";
import AsyncSelect from "react-select/async";
import classNames from "classnames";
import debounce from "lodash/debounce";
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from "../../constants";
import companyApi from "../../../libs/apis/company.api";
import CompanyModalForm from "./CompanyModalForm";

const formatOptionLabel = data => (
  <div className="text-white">
    <span>{data.name}</span>
  </div>
);

const CompanySelect = React.forwardRef((
  {
    onBlur,
    invalid,
    name,
    placeholder,
    onAdded,
    onChange,
    value,
    creatable = true,
    ...props
  },
  // eslint-disable-next-line no-unused-vars
  ref,
) => {
  const [isOpen, open] = useState(false);
  const [newCreateId, setNewCreateId] = useState(0);
  const loadOptions = debounce((inputValue, cb) => {
    companyApi
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
      key={`${name}_${newCreateId}`}
      className={classNames({ "is-invalid": invalid })}
    >
      <InputGroup {...props}>
        <AsyncSelect
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder={placeholder}
          loadOptions={loadOptions}
          defaultOptions
          styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
          noOptionsMessage={({ inputValue }) =>
            inputValue
              ? `Not found any Company with search "${inputValue}", try to search another`
              : "Input and search Company"
          }
          isClearable
          onBlur={onBlur}
          onChange={val =>
            onChange(val ? { id: val.id, name: val.name } : null)
          }
          formatOptionLabel={formatOptionLabel}
          getOptionValue={data => data.id}
          name={name}
          value={value}
        />
        {creatable ? (
          <InputGroupAddon addonType="append">
            <Button
              color="primary"
              type="button"
              className="pt-0 pb-0"
              onClick={() => open(true)}
            >
              <i className="las la-plus" />
            </Button>
          </InputGroupAddon>
        ) : (
          ""
        )}
      </InputGroup>
      {creatable ? (
        <CompanyModalForm
          closeHandle={val => {
            if (val) {
              setNewCreateId(val.id);
              if (onAdded) {
                onAdded(val);
              }
            }
            open(false);
          }}
          isOpen={isOpen}
        />
      ) : (
        ""
      )}
    </div>
  );
});

CompanySelect.propTypes = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onAdded: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  creatable: PropTypes.bool,
};

export default CompanySelect;
