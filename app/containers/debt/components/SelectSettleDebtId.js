import React from "react";
import PropTypes from "prop-types";
import { InputGroup } from "reactstrap";
import AsyncSelect from "react-select/async";
import classNames from "classnames";
import debounce from "lodash/debounce";
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from "../../../components/constants";
import debtApi from "../../../libs/apis/debt/debt.api";

const formatOptionLabel = data => (
  <div className="text-white">
    <span>{data.name}</span>
  </div>
);

const SelectSettleDebtId = React.forwardRef((
  {
    onBlur,
    invalid,
    name,
    placeholder,
    onAdded,
    onChange,
    value,
    debtType,
    ...props
  },
  // eslint-disable-next-line no-unused-vars
  ref,
) => {
  const loadOptions = debounce((inputValue, cb) => {
    debtApi
      .search({
        page: 1,
        size: 10,
        filter: {
          search: inputValue,
          debtType,
        },
      })
      .then(resp => cb(resp.rows));
  }, 300);

  return React.useMemo(
    () => (
      <div
        className={classNames({ "is-invalid": invalid })}
        key={`${name}-${debtType}`}
      >
        <InputGroup {...props}>
          <AsyncSelect
            aria-labelledby="test"
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder={placeholder}
            loadOptions={loadOptions}
            defaultOptions
            styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
            noOptionsMessage={({ inputValue }) =>
              inputValue
                ? `Not found any Debt with search "${inputValue}", try to search another`
                : "Input and search Debt"
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
        </InputGroup>
      </div>
    ),
    [debtType],
  );
});

SelectSettleDebtId.propTypes = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onAdded: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  creatable: PropTypes.bool,
  debtType: PropTypes.array,
};

export default SelectSettleDebtId;
