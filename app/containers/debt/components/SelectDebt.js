import React from "react";
import PropTypes from "prop-types";
import { InputGroup } from "reactstrap";
import AsyncSelect from "react-select/async";
import classNames from "classnames";
import debounce from "lodash/debounce";
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from "../../../components/constants";
import debtApi from "../../../libs/apis/debt/debt.api";
import SubjectView from "../../partner/subject/components/SubjectView";
import Price from "../../../components/common/Price";

const formatOptionLabel = (data, { context }) => (
  <div className="text-white">
    <span className="font-weight-bold">{data.name}</span>

    {context === "menu" && (
      <>
        <br />
        <span>
          <Price className="text-danger" amount={data.amount} />
        </span>
        <SubjectView
          item={data.subject}
          isShowTagging={false}
          isShowAddress={false}
        />
      </>
    )}
  </div>
);

const SelectDebt = React.forwardRef((
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
            onChange={val => onChange(val || null)}
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

SelectDebt.propTypes = {
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

export default SelectDebt;
